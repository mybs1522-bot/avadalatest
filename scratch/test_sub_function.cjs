const https = require('https');

const data = JSON.stringify({
  plan_id: 'plan_TOwcG0UPdKNApw',
  trial_days: 3,
  monthly_amount: 399
});

const req = https.request('https://aexrgtpxyzfxjecozstf.supabase.co/functions/v1/razorpay-subscription', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Edge function response status:', res.statusCode);
    console.log('Response body:', body);
  });
});

req.on('error', (e) => {
  console.error('Error testing Edge function:', e);
});

req.write(data);
req.end();
