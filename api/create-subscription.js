import https from 'https';

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
    const trialDays = 3;
    const startAtUnix = Math.floor(Date.now() / 1000) + (trialDays * 24 * 60 * 60);

    const payload = JSON.stringify({
      plan_id: planId,
      total_count: 120,
      quantity: 1,
      start_at: startAtUnix,
      customer_notify: 1
    });

    const razorpayReq = https.request('https://api.razorpay.com/v1/subscriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, (razorpayRes) => {
      let body = '';
      razorpayRes.on('data', chunk => body += chunk);
      razorpayRes.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (razorpayRes.statusCode >= 200 && razorpayRes.statusCode < 300 && data.id) {
            return res.status(200).json({ subscriptionId: data.id });
          } else {
            return res.status(razorpayRes.statusCode || 400).json({ error: data.error?.description || 'Failed to create Razorpay subscription' });
          }
        } catch (e) {
          return res.status(500).json({ error: 'Invalid JSON response from Razorpay' });
        }
      });
    });

    razorpayReq.on('error', (err) => {
      console.error('Error connecting to Razorpay API:', err);
      return res.status(500).json({ error: err.message });
    });

    razorpayReq.write(payload);
    razorpayReq.end();
  } catch (error) {
    console.error('Error handling subscription request:', error);
    return res.status(500).json({ error: error.message });
  }
}
