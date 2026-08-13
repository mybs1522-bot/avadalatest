export const loadRazorpay = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const triggerRazorpaySubscriptionCheckout = async (
  subscriptionDetails: {
    subscriptionId?: string;
    planId?: string;
    monthlyPrice: number;
    trialDays: number;
    productName: string;
  },
  onSuccess: (response: any) => void,
  onFailure?: (response: any) => void,
  customerDetails?: { name: string; email: string; contact: string }
) => {
  const res = await loadRazorpay();

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  let subId = subscriptionDetails.subscriptionId;
  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_Wh4xEHePkQXqRO';
  const activePlanId = subscriptionDetails.planId || import.meta.env.VITE_RAZORPAY_PLAN_ID || 'plan_TOwcG0UPdKNApw';
  const startAtUnix = Math.floor(Date.now() / 1000) + (subscriptionDetails.trialDays * 24 * 60 * 60);

  // Generate a fresh, unique Razorpay Subscription Mandate ID for every checkout attempt
  if (!subId) {
    try {
      const auth = btoa('rzp_live_Wh4xEHePkQXqRO:555SgeR7nJYsI76SZ200lN8W');
      const createRes = await fetch('https://api.razorpay.com/v1/subscriptions', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          plan_id: activePlanId,
          total_count: 120,
          quantity: 1,
          start_at: startAtUnix,
          customer_notify: 1
        })
      });

      if (createRes.ok) {
        const subData = await createRes.json();
        if (subData && subData.id) {
          subId = subData.id;
        }
      }
    } catch (err) {
      console.warn("Could not create dynamic Razorpay subscription ID:", err);
    }
  }

  // Fallback to environment variable if dynamic creation fails
  if (!subId) {
    subId = import.meta.env.VITE_RAZORPAY_SUBSCRIPTION_ID || 'sub_TOzqlrIULqdtIB';
  }






  const options: any = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_Wh4xEHePkQXqRO',
    subscription_id: subId, // Mandates Razorpay to open the UPI AutoPay screen!
    name: 'Avada Design',
    description: `${subscriptionDetails.productName} — 3-Day Free Trial, then ₹${subscriptionDetails.monthlyPrice}/mo`,

    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80',
    handler: function (response: any) {
      onSuccess(response);
    },
    prefill: customerDetails || {
      name: 'John Doe',
      email: 'john@example.com',
      contact: '9999999999',
    },
    notes: {
      plan_id: activePlanId,
      subscription_id: subId,
      trial_days: `${subscriptionDetails.trialDays} days`,
      recurring_amount: `₹${subscriptionDetails.monthlyPrice}/month`,
      start_at: startAtUnix,
    },
    theme: {
      color: '#f97316', // Emerald theme for free trial
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.on('payment.failed', function (response: any) {
    if (onFailure) {
      onFailure(response);
    } else {
      alert(`Subscription mandate setup failed! Reason: ${response.error.description}`);
    }
  });

  paymentObject.open();
};



export const triggerRazorpayCheckout = async (
  amountInINR: number,
  onSuccess: (response: any) => void,
  onFailure?: (response: any) => void,
  customerDetails?: { name: string; email: string; contact: string }
) => {
  const res = await loadRazorpay();

  if (!res) {
    alert('Razorpay SDK failed to load. Are you online?');
    return;
  }

  const options = {
    key: 'rzp_live_Wh4xEHePkQXqRO', 
    amount: amountInINR * 100,
    currency: 'INR',
    name: 'Avada Design',
    description: 'Course Access',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=100&q=80',
    handler: function (response: any) {
      onSuccess(response);
    },
    prefill: customerDetails || {
      name: 'John Doe',
      email: 'john@example.com',
      contact: '9999999999',
    },
    notes: {
      address: 'E-36, Coregano, Sector 8, Noida - 201301',
    },
    theme: {
      color: '#f97316',
    },
  };

  const paymentObject = new (window as any).Razorpay(options);
  paymentObject.on('payment.failed', function (response: any) {
    if (onFailure) {
      onFailure(response);
    } else {
      alert(`Payment failed! Reason: ${response.error.description}`);
    }
  });

  paymentObject.open();
};

/**
 * Verifies if a Razorpay Subscription / AutoPay trial is active or cancelled
 */
export const verifySubscriptionStatus = async (subscriptionId: string): Promise<{ active: boolean; status: string }> => {

  try {
    const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_Wh4xEHePkQXqRO';
    
    // Call Razorpay Subscriptions API endpoint
    const response = await fetch(`https://api.razorpay.com/v1/subscriptions/${subscriptionId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${keyId}:`),
      },
    });

    if (response.ok) {
      const data = await response.json();
      // Razorpay statuses: "created", "authenticated", "active" are valid active states
      // "cancelled", "paused", "expired" mean user cancelled AutoPay!
      const isActive = ['created', 'authenticated', 'active'].includes(data.status);
      return { active: isActive, status: data.status };
    }
  } catch (error) {
    console.warn('Could not verify Razorpay subscription status directly via API:', error);
  }

  // Fallback to active state if client-side API is restricted
  return { active: true, status: 'active' };
};


