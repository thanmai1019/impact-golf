import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// This connects securely to your Stripe account using the hidden secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-03-25.dahlia', // Use the latest stable API version
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { planType, userId } = body; // 'monthly' or 'yearly' 

    // Set up the prices (in real life, you create these in the Stripe Dashboard and use their IDs)
    // For this training step, we will use hardcoded price amounts: $10/month or $100/year
    const priceAmount = planType === 'yearly' ? 10000 : 1000; // Stripe counts in cents! ($10.00 = 1000)

    // Ask Stripe to create a secure checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Impact Golf ${planType === 'yearly' ? 'Yearly' : 'Monthly'} Subscription`,
            },
            unit_amount: priceAmount,
            recurring: {
              interval: planType === 'yearly' ? 'year' : 'month',
            },
          },
          quantity: 1,
        },
      ],
      // We pass the user ID so we know who paid when Stripe sends the receipt back!
      client_reference_id: userId, 
      // Where to send the user after they pay (or if they cancel)
      success_url: `${request.headers.get('origin')}/dashboard?success=true`,
      cancel_url: `${request.headers.get('origin')}/dashboard?canceled=true`,
    });

    // Send the secure Stripe checkout link back to the frontend
    return NextResponse.json({ url: session.url });

  } catch (err: any) {
    console.error('Stripe Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}