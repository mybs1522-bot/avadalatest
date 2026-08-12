import { supabase } from '../services/supabase';

/**
 * Register a new student in the database after successful Razorpay payment.
 * Uses upsert so if the same email+phone pays again, it refreshes their trial.
 */
export async function registerStudent(data: {
  email: string;
  phone: string;
  name: string;
  subscriptionId?: string;
}): Promise<boolean> {
  const { error } = await supabase
    .from('students')
    .upsert(
      {
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        name: data.name.trim(),
        subscription_id: data.subscriptionId || null,
        trial_start: new Date().toISOString(),
        trial_active: true,
      },
      { onConflict: 'email,phone' }
    );

  if (error) {
    console.error('Failed to register student in database:', error);
    return false;
  }
  return true;
}

/**
 * Verify a student's login by checking email + phone against the database.
 * Returns verification result with student data or error reason.
 */
export async function verifyStudentLogin(
  email: string,
  phone: string
): Promise<{
  verified: boolean;
  student: { id: string; email: string; phone: string; name: string; trial_active: boolean; trial_start: string } | null;
  reason: string;
}> {
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('email', email.trim().toLowerCase())
    .eq('phone', phone.trim())
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('Student verification query failed:', error);
    return { verified: false, student: null, reason: 'Something went wrong. Please try again.' };
  }

  if (!data) {
    return {
      verified: false,
      student: null,
      reason: 'No account found with this email and phone number. Please check your details or start a free trial first.',
    };
  }

  if (!data.trial_active) {
    return {
      verified: false,
      student: data,
      reason: 'Your subscription has been cancelled or expired. Please start a new trial.',
    };
  }

  return {
    verified: true,
    student: data,
    reason: 'Login successful',
  };
}
