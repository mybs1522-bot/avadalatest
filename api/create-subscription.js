export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const keyId = process.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_Wh4xEHePkQXqRO';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || '555SgeR7nJYsI76SZ200lN8W';
    const planId = process.env.VITE_RAZORPAY_PLAN_ID || 'plan_TOwcG0UPdKNApw';

    const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const startAt = Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60); // 3-day free trial

    const payload = JSON.stringify({
      plan_id: planId,
      total_count: 12,
      quantity: 1,
      start_at: startAt,
      customer_notify: 1
    });

    const response = await fetch('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: payload
    });

    const data = await response.json();

    if (response.ok && data.id) {
      return res.status(200).json({ subscriptionId: data.id });
    } else {
      return res.status(400).json({ error: data.error?.description || 'Failed to create subscription' });
    }
  } catch (error) {
    console.error('Error creating subscription:', error);
    return res.status(500).json({ error: error.message });
  }
}
