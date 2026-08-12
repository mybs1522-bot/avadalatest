/**
 * METHOD 1: Razorpay Webhook Handler
 * Production server endpoint for processing Razorpay Subscription Events
 * (Hostable on Node.js / Express / Next.js / Supabase / Vercel API routes)
 */

import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || 'your_webhook_secret_here';
    const razorpaySignature = req.headers['x-razorpay-signature'];

    // 1. Verify Webhook Signature for Security
    const bodyString = JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(bodyString)
      .digest('hex');

    if (expectedSignature !== razorpaySignature) {
      console.error('Invalid Razorpay Webhook Signature!');
      return res.status(400).json({ error: 'Invalid webhook signature' });
    }

    // 2. Parse Event Data
    const event = req.body.event;
    const payload = req.body.payload;

    console.log(`Received Razorpay Event: ${event}`);

    switch (event) {
      case 'subscription.authenticated':
        // Trial started & AutoPay mandate authorized
        const subAuth = payload.subscription.entity;
        console.log(`Mandate Authorized for Subscription ${subAuth.id} (Plan: ${subAuth.plan_id})`);
        // DB Action: Mark user trialActive = true
        break;

      case 'subscription.cancelled':
        // Customer revoked AutoPay in GPay/PhonePe or cancelled trial
        const subCancelled = payload.subscription.entity;
        console.log(`Subscription Cancelled by User: ${subCancelled.id}`);
        // DB Action: Revoke access -> Mark user trialActive = false, status = 'cancelled'
        break;

      case 'subscription.paused':
        // Customer paused AutoPay mandate
        const subPaused = payload.subscription.entity;
        console.log(`Subscription Paused by User: ${subPaused.id}`);
        // DB Action: Mark user trialActive = false, status = 'paused'
        break;

      case 'subscription.charged':
        // Successful monthly ₹199 billing executed after trial!
        const subCharged = payload.subscription.entity;
        const payment = payload.payment.entity;
        console.log(`Monthly Billing Success ₹${payment.amount / 100} for Sub ${subCharged.id}`);
        // DB Action: Extend student subscription period by 30 days
        break;

      default:
        console.log(`Unhandled Razorpay event: ${event}`);
    }

    return res.status(200).json({ status: 'ok', received: true });
  } catch (error) {
    console.error('Error handling Razorpay Webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
