const https = require('https');

const keyId = 'rzp_live_Wh4xEHePkQXqRO';
const keySecret = '555SgeR7nJYsI76SZ200lN8W';
const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

const payload = JSON.stringify({
  plan_id: 'plan_TOwcG0UPdKNApw',
  total_count: 120,
  quantity: 1,
  customer_notify: 1
});

const req = https.request('https://api.razorpay.com/v1/subscriptions', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/json',
    'Content-Length': payload.length
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Razorpay Response:', body);
  });
});

req.write(payload);
req.end();
