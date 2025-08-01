// app/api/stripe/webhook/route.js
import { Stripe } from "stripe";
import { buffer } from "micro";
import connectDB from "@/lib/db";
import Booking from "@/model/Booking";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await buffer(req);
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return new Response(JSON.stringify({ error: "Webhook error" }), {
      status: 400,
    });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    await connectDB();
    await Booking.updateOne(
      { paymentIntentId: paymentIntent.id },
      { paymentStatus: "Completed" }
    );
    console.log(`Payment succeeded for paymentIntentId: ${paymentIntent.id}`);
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}

export const config = {
  api: { bodyParser: false },
};
