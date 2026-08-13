import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 4000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'razorpay-dev-api',
          configureServer(server) {
            server.middlewares.use('/api/create-subscription', async (req, res) => {
              if (req.method === 'OPTIONS') {
                res.writeHead(200, {
                  'Access-Control-Allow-Origin': '*',
                  'Access-Control-Allow-Methods': 'POST, OPTIONS',
                  'Access-Control-Allow-Headers': 'Content-Type',
                });
                res.end();
                return;
              }

              const https = await import('https');
              const keyId = env.VITE_RAZORPAY_KEY_ID || 'rzp_live_Wh4xEHePkQXqRO';
              const keySecret = env.RAZORPAY_KEY_SECRET || '555SgeR7nJYsI76SZ200lN8W';
              const planId = env.VITE_RAZORPAY_PLAN_ID || 'plan_TOwcG0UPdKNApw';

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
                  res.writeHead(razorpayRes.statusCode || 200, {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                  });
                  res.end(body);
                });
              });

              razorpayReq.on('error', (err) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              });

              razorpayReq.write(payload);
              razorpayReq.end();
            });
          }
        }
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
