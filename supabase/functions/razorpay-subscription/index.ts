import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RAZORPAY_KEY_ID = Deno.env.get('RAZORPAY_KEY_ID') || 'rzp_live_Wh4xEHePkQXqRO'
const RAZORPAY_KEY_SECRET = Deno.env.get('RAZORPAY_KEY_SECRET')

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
            }
        })
    }

    try {
        const { plan_id, trial_days = 2, monthly_amount = 199 } = await req.json()

        if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
            throw new Error('Razorpay Key Secret is required in environment to create Subscription mandates')
        }

        const auth = btoa(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`)
        let activePlanId = plan_id

        // 1. If plan_id is not provided, create a monthly plan dynamically via Razorpay API
        if (!activePlanId) {
            const planRes = await fetch('https://api.razorpay.com/v1/plans', {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${auth}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    period: 'monthly',
                    interval: 1,
                    item: {
                        name: 'Avada Monthly Course Pass',
                        amount: Math.round(monthly_amount * 100), // paise
                        currency: 'INR',
                        description: '₹199/month recurring pass after 2-day trial'
                    }
                })
            })

            const planData = await planRes.json()
            if (!planRes.ok) {
                throw new Error(planData.error?.description || 'Failed to create Razorpay Plan')
            }
            activePlanId = planData.id
        }

        // 2. Calculate start_at unix timestamp (48 hrs from now for 2-day trial)
        const startAtUnix = Math.floor(Date.now() / 1000) + (trial_days * 24 * 60 * 60)

        // 3. Create Subscription Mandate in Razorpay
        const subRes = await fetch('https://api.razorpay.com/v1/subscriptions', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${auth}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plan_id: activePlanId,
                total_count: 120, // 10 years
                quantity: 1,
                start_at: startAtUnix,
                customer_notify: 1
            })
        })

        const subData = await subRes.json()
        if (!subRes.ok) {
            throw new Error(subData.error?.description || 'Failed to create Razorpay Subscription Mandate')
        }

        return new Response(JSON.stringify({ 
            subscriptionId: subData.id,
            planId: activePlanId,
            startAt: startAtUnix 
        }), {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
    } catch (error) {
        console.error('Error in razorpay-subscription:', error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        })
    }
})
