const https = require('https');

const keyId = 'rzp_live_Wh4xEHePkQXqRO';
const keySecret = '555SgeR7nJYsI76SZ200lN8W';
const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

// Query subscriptions list
const req = https.request('https://api.razorpay.com/v1/subscriptions?count=5', {
  method: 'GET',
  headers: {
    'Authorization': `Basic ${auth}`
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Razorpay Subscriptions Status:', res.statusCode);
    const data = JSON.parse(body);
    if (data.items) {
      data.items.forEach(sub => {
        console.log(`- Sub ID: ${sub.id} | Status: ${sub.status} | Plan: ${sub.plan_id} | Created At: ${new Date(sub.created_at * 1000).toLocaleString()}`);
      });
    } else {
      console.log('Response:', body);
    }
  });
});

req.end();
