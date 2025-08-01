// import { Stripe } from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export async function POST(req) {
//   try {
//     const { amount, currency, flightId, seats, passengers } = await req.json();

//     if (!amount || !currency || !flightId || !seats || !passengers) {
//       return new Response(
//         JSON.stringify({ error: "Missing required fields" }),
//         { status: 400 }
//       );
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100), // Convert to smallest currency unit (e.g., paise for INR)
//       currency: currency || "inr",
//       metadata: {
//         flightId,
//         seats: JSON.stringify(seats),
//         passengerCount: passengers.length,
//       },
//       description: `Booking for flight ${flightId}`,
//       payment_method_types: ["card"],
//     });

//     return new Response(
//       JSON.stringify({ clientSecret: paymentIntent.client_secret }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error creating Payment Intent:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to create payment intent" }),
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import stripe from "@/lib/stripe"; // Import from centralized config

export async function POST(req) {
  try {
    const { amount, currency, flightId, seats, passengers } = await req.json();

    if (!amount || !currency || !flightId || !seats || !passengers) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit (e.g., paise for INR)
      currency: currency || "inr",
      metadata: {
        flightId,
        seats: JSON.stringify(seats),
        passengerCount: passengers.length,
      },
      description: `Booking for flight ${flightId}`,
      payment_method_types: ["card"],
    });

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
