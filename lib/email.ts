/**
 * Resend Email Service Helper for Student Portal Access & Trial Welcome Emails
 */

export const sendStudentWelcomeEmail = async ({
  studentEmail,
  studentName,
  resendApiKey = import.meta.env.VITE_RESEND_API_KEY || '',
  portalUrl = `${window.location.origin}/portal`,
}: {
  studentEmail: string;
  studentName: string;
  resendApiKey?: string;
  portalUrl?: string;
}) => {
  if (!resendApiKey) {
    console.warn('Resend API key missing. Email notification skipped.');
    return { success: false, reason: 'API Key missing' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Avada Design <onboarding@resend.dev>', // Replace with your verified domain email
        to: [studentEmail],
        subject: '🚀 Your 2-Day Free Trial is Active! Access Your Course Library',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px; }
                .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); border: 1px solid #e4e4e7; }
                .header { bg-color: #18181b; background: #18181b; color: #ffffff; padding: 32px 24px; text-align: center; }
                .badge { display: inline-block; background: rgba(16, 185, 129, 0.2); color: #10b981; font-weight: bold; font-size: 11px; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px; }
                .content { padding: 32px 24px; color: #27272a; line-height: 1.6; }
                .button { display: block; width: 100%; max-width: 300px; margin: 24px auto; background: #059669; color: #ffffff !important; font-weight: bold; text-decoration: none; padding: 16px 24px; border-radius: 12px; text-align: center; box-shadow: 0 4px 14px rgba(5, 150, 105, 0.4); }
                .footer { background: #fafafa; padding: 20px; text-align: center; font-size: 12px; color: #71717a; border-t: 1px solid #e4e4e7; }
              </style>
            </head>
            <body>
              <div class="card">
                <div class="header">
                  <div class="badge">2-DAY FREE TRIAL ACTIVATED</div>
                  <h1 style="margin: 0; font-size: 24px; font-weight: 800;">Welcome to Avada Design</h1>
                  <p style="margin: 6px 0 0; color: #a1a1aa; font-size: 13px;">Your 3D Architectural Masterclass Library is Ready</p>
                </div>
                
                <div class="content">
                  <p style="font-size: 16px; font-weight: 600;">Hi ${studentName},</p>
                  <p>Your <strong>2-Day Free Trial (₹0 Today)</strong> has been successfully activated! You now have full HD streaming access to all 4 course masterclasses:</p>
                  
                  <ul style="padding-left: 20px; color: #3f3f46; font-size: 14px;">
                    <li><strong>SketchUp + V-Ray Complete Masterclass</strong> (22 Video Lessons)</li>
                    <li><strong>D5 Render Real-Time Visualization</strong> (7 Video Lessons)</li>
                    <li><strong>AutoCAD 2D Drafting & Architectural Blueprints</strong> (9 Video Lessons)</li>
                    <li><strong>Lumion Landscape Architecture & Walkthroughs</strong> (15 Video Lessons)</li>
                  </ul>

                  <a href="${portalUrl}" class="button">Log In To Student Portal &rarr;</a>

                  <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 16px; margin-top: 24px;">
                    <strong style="color: #065f46; font-size: 13px;">🔒 Access Details:</strong>
                    <p style="margin: 4px 0 0; font-size: 12px; color: #047857;">
                      Login Email: <strong>${studentEmail}</strong><br/>
                      Trial Duration: <strong>48 Hours (₹0 Today)</strong>
                    </p>
                  </div>
                </div>

                <div class="footer">
                  Need help? Contact support at <a href="mailto:support@avada.com" style="color: #059669;">support@avada.com</a><br/>
                  © ${new Date().getFullYear()} Avada Design. All rights reserved.
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Welcome email sent via Resend API:', data);
      return { success: true, data };
    } else {
      const errData = await response.json();
      console.error('Resend API Error:', errData);
      return { success: false, error: errData };
    }
  } catch (err) {
    console.error('Failed to trigger Resend API email:', err);
    return { success: false, error: err };
  }
};
