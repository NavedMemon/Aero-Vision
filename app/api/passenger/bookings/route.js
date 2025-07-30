import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/model/Booking";
import Flight from "@/model/Flight";
import Passenger from "@/model/Passenger";
import Airline from "@/model/Airline";
import Gate from "@/model/Gate";
import jwt from "jsonwebtoken";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import Stripe from "stripe"; // Added import

const JWT_SECRET = process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

let stripe;
try {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
  }
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} catch (error) {
  console.error("Stripe initialization error:", error.message);
}

// export async function GET(req) {
//   await connectDB();
//   try {
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized: No token found" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (decoded.role !== "passenger") {
//       return NextResponse.json(
//         { error: "Forbidden: Not a passenger" },
//         { status: 403 }
//       );
//     }

//     const passenger = await Passenger.findById(decoded.id);
//     if (!passenger) {
//       console.log("Passenger not found for id:", decoded.id);
//       return NextResponse.json(
//         { error: "Passenger not found" },
//         { status: 404 }
//       );
//     }

//     const bookings = await Booking.find({ passenger: decoded.id })
//       .populate({
//         path: "flight",
//         populate: [
//           { path: "airline", select: "name logo" },
//           { path: "gate", select: "gateNumber" },
//         ],
//       })
//       .sort({ createdAt: -1 });
//     console.log("Fetched bookings:", JSON.stringify(bookings, null, 2));
//     return NextResponse.json({ bookings });
//   } catch (error) {
//     console.error("GET bookings error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   await connectDB();
//   try {
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized: No token found" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (decoded.role !== "passenger") {
//       return NextResponse.json(
//         { error: "Forbidden: Not a passenger" },
//         { status: 403 }
//       );
//     }

//     const passenger = await Passenger.findById(decoded.id);
//     if (!passenger) {
//       console.log("Passenger not found for id:", decoded.id);
//       return NextResponse.json(
//         { error: "Passenger not found" },
//         { status: 404 }
//       );
//     }

//     const formData = await req.formData();
//     const flightId = formData.get("flightId");
//     const seats = JSON.parse(formData.get("seats"));
//     const passengers = JSON.parse(formData.get("passengers"));
//     const totalPrice = parseFloat(formData.get("totalPrice"));

//     if (!flightId || !seats?.length || !passengers?.length || !totalPrice) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     if (seats.length < 1 || seats.length > 5) {
//       return NextResponse.json({ error: "Select 1-5 seats" }, { status: 400 });
//     }

//     if (seats.length !== passengers.length) {
//       return NextResponse.json(
//         { error: "Passenger details must match number of seats" },
//         { status: 400 }
//       );
//     }

//     const flight = await Flight.findById(flightId);
//     if (!flight) {
//       return NextResponse.json({ error: "Flight not found" }, { status: 404 });
//     }

//     // Check if seats are already booked
//     const existingBookings = await Booking.find({
//       flight: flightId,
//       status: "Confirmed",
//     });
//     const bookedSeats = existingBookings.flatMap((b) => b.seats);
//     if (seats.some((seat) => bookedSeats.includes(seat))) {
//       return NextResponse.json(
//         { error: "Some seats are already booked" },
//         { status: 400 }
//       );
//     }

//     // Ensure uploads directory exists
//     const uploadDir = path.join(process.cwd(), "public", "uploads");
//     try {
//       await mkdir(uploadDir, { recursive: true });
//     } catch (err) {
//       console.error("Failed to create uploads directory:", err.message);
//       return NextResponse.json(
//         { error: "Server error creating upload directory" },
//         { status: 500 }
//       );
//     }

//     // Save documents
//     const savedDocuments = [];
//     for (let i = 0; i < passengers.length; i++) {
//       const document = formData.get(`document${i}`);
//       if (document) {
//         const bytes = await document.arrayBuffer();
//         const buffer = Buffer.from(bytes);
//         const fileName = `${Date.now()}-${document.name}`;
//         const filePath = path.join(uploadDir, fileName);
//         try {
//           await writeFile(filePath, buffer);
//           savedDocuments.push(`/uploads/${fileName}`);
//         } catch (err) {
//           console.error(`Failed to save document ${fileName}:`, err.message);
//           return NextResponse.json(
//             { error: `Failed to save document for passenger ${i + 1}` },
//             { status: 500 }
//           );
//         }
//       } else {
//         return NextResponse.json(
//           { error: `Document missing for passenger ${i + 1}` },
//           { status: 400 }
//         );
//       }
//     }

//     const booking = new Booking({
//       flight: flightId,
//       passenger: decoded.id,
//       seats,
//       passengers: passengers.map((p, i) => ({
//         name: p.name.trim(),
//         dob: new Date(p.dob),
//         gender: p.gender,
//         document: savedDocuments[i],
//       })),
//       totalPrice,
//       paymentStatus: "Completed",
//       status: "Confirmed",
//     });
//     await booking.save();

//     return NextResponse.json({ success: true, booking }, { status: 201 });
//   } catch (error) {
//     console.error("POST booking error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function DELETE(req) {
//   await connectDB();
//   try {
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized: No token found" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (decoded.role !== "passenger") {
//       return NextResponse.json(
//         { error: "Forbidden: Not a passenger" },
//         { status: 403 }
//       );
//     }

//     const passenger = await Passenger.findById(decoded.id);
//     if (!passenger) {
//       console.log("Passenger not found for id:", decoded.id);
//       return NextResponse.json(
//         { error: "Passenger not found" },
//         { status: 404 }
//       );
//     }

//     const { bookingId } = await req.json();
//     if (!bookingId) {
//       return NextResponse.json(
//         { error: "Booking ID required" },
//         { status: 400 }
//       );
//     }

//     const booking = await Booking.findOneAndUpdate(
//       { _id: bookingId, passenger: decoded.id },
//       { status: "Cancelled" },
//       { new: true }
//     );
//     if (!booking) {
//       return NextResponse.json({ error: "Booking not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("DELETE booking error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

export async function GET(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "passenger") {
      return NextResponse.json(
        { error: "Forbidden: Not a passenger" },
        { status: 403 }
      );
    }

    const passenger = await Passenger.findById(decoded.id);
    if (!passenger) {
      console.log("Passenger not found for id:", decoded.id);
      return NextResponse.json(
        { error: "Passenger not found" },
        { status: 404 }
      );
    }

    const bookings = await Booking.find({ passenger: decoded.id })
      .populate({
        path: "flight",
        populate: [
          { path: "airline", select: "name logo" },
          { path: "gate", select: "gateNumber" },
        ],
      })
      .sort({ createdAt: -1 });
    console.log("Fetched bookings:", JSON.stringify(bookings, null, 2));
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("GET bookings error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not initialized" },
        { status: 500 }
      );
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "passenger") {
      return NextResponse.json(
        { error: "Forbidden: Not a passenger" },
        { status: 403 }
      );
    }

    const passenger = await Passenger.findById(decoded.id);
    if (!passenger) {
      console.log("Passenger not found for id:", decoded.id);
      return NextResponse.json(
        { error: "Passenger not found" },
        { status: 404 }
      );
    }

    const formData = await req.formData();
    const flightId = formData.get("flightId");
    const seats = JSON.parse(formData.get("seats"));
    const passengers = JSON.parse(formData.get("passengers"));
    const totalPrice = parseFloat(formData.get("totalPrice"));
    const paymentIntentId = formData.get("paymentIntentId");

    if (!flightId || !seats?.length || !passengers?.length || !totalPrice || !paymentIntentId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Verify Stripe Payment Intent
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      if (paymentIntent.status !== "succeeded") {
        return NextResponse.json(
          { error: "Payment not confirmed" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Stripe payment verification error:", error.message);
      return NextResponse.json(
        { error: "Invalid payment intent" },
        { status: 400 }
      );
    }

    if (seats.length < 1 || seats.length > 5) {
      return NextResponse.json({ error: "Select 1-5 seats" }, { status: 400 });
    }

    if (seats.length !== passengers.length) {
      return NextResponse.json(
        { error: "Passenger details must match number of seats" },
        { status: 400 }
      );
    }

    const flight = await Flight.findById(flightId);
    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    // Verify totalPrice matches expected amount
    const expectedAmount = Math.round(flight.price * seats.length * 100); // Convert to paise
    if (Math.round(totalPrice * 100) !== expectedAmount) {
      return NextResponse.json(
        { error: "Invalid total price" },
        { status: 400 }
      );
    }

    const existingBookings = await Booking.find({
      flight: flightId,
      status: "Confirmed",
    });
    const bookedSeats = existingBookings.flatMap((b) => b.seats);
    if (seats.some((seat) => bookedSeats.includes(seat))) {
      return NextResponse.json(
        { error: "Some seats are already booked" },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.error("Failed to create uploads directory:", err.message);
      return NextResponse.json(
        { error: "Server error creating upload directory" },
        { status: 500 }
      );
    }

    const savedDocuments = [];
    for (let i = 0; i < passengers.length; i++) {
      const document = formData.get(`document${i}`);
      if (document) {
        const bytes = await document.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${document.name}`;
        const filePath = path.join(uploadDir, fileName);
        try {
          await writeFile(filePath, buffer);
          savedDocuments.push(`/uploads/${fileName}`);
        } catch (err) {
          console.error(`Failed to save document ${fileName}:`, err.message);
          return NextResponse.json(
            { error: `Failed to save document for passenger ${i + 1}` },
            { status: 500 }
          );
        }
      } else {
        return NextResponse.json(
          { error: `Document missing for passenger ${i + 1}` },
          { status: 400 }
        );
      }
    }

    const booking = new Booking({
      flight: flightId,
      passenger: decoded.id,
      seats,
      passengers: passengers.map((p, i) => ({
        name: p.name.trim(),
        dob: new Date(p.dob),
        gender: p.gender,
        document: savedDocuments[i],
      })),
      totalPrice,
      paymentStatus: "Completed",
      paymentIntentId, // Store paymentIntentId
      status: "Confirmed",
    });
    await booking.save();

    return NextResponse.json({ success: true, booking }, { status: 201 });
  } catch (error) {
    console.error("POST booking error:", error.message);
    return NextResponse.json({ error: error.message || "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    if (!stripe) {
      console.error("Stripe is not initialized for refund in DELETE");
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "passenger") {
      return NextResponse.json(
        { error: "Forbidden: Not a passenger" },
        { status: 403 }
      );
    }

    const passenger = await Passenger.findById(decoded.id);
    if (!passenger) {
      console.log("Passenger not found for id:", decoded.id);
      return NextResponse.json(
        { error: "Passenger not found" },
        { status: 404 }
      );
    }

    const { bookingId } = await req.json();
    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID required" },
        { status: 400 }
      );
    }

    const booking = await Booking.findOneAndDelete({
      _id: bookingId,
      passenger: decoded.id,
    });
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.paymentIntentId && stripe) {
      try {
        await stripe.refunds.create({
          payment_intent: booking.paymentIntentId,
        });
        console.log(`Refund initiated for paymentIntentId: ${booking.paymentIntentId}`);
      } catch (err) {
        console.error("Refund error:", err.message);
        // Log but don't fail the deletion
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE booking error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}