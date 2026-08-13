const http = require('http');

const req = http.request('http://localhost:4000/api/create-subscription', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => {
    console.log('Local Middleware Status:', res.statusCode);
    console.log('Local Middleware Response:', body);
  });
});

req.on('error', (e) => {
  console.error('Error calling local middleware:', e.message);
});

req.end();
