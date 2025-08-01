import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Booking from "@/model/Booking"; // Use @ alias for model
import Flight from "@/model/Flight"; // Use @ alias for model
import Passenger from "@/model/Passenger"; // Use @ alias for model
import connectDB from "@/lib/db"; // Use @ alias for db
import stripe from "@/lib/stripe"; // Import from centralized config

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const bookings = await Booking.find()
      .populate({
        path: "flight",
        populate: [
          { path: "airline", select: "name logo" },
          { path: "gate", select: "gateNumber" },
        ],
      })
      .populate("passenger", "email")
      .sort({ createdAt: -1 });

    console.log(
      "Fetched bookings for admin:",
      JSON.stringify(bookings, null, 2)
    );
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("GET manageflights error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const { bookingId, delayHours } = await req.json();
    if (!bookingId || !delayHours || isNaN(delayHours) || delayHours <= 0) {
      return NextResponse.json(
        { error: "Invalid booking ID or delay hours" },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.status === "Cancelled") {
      return NextResponse.json(
        { error: "Cannot delay a cancelled booking" },
        { status: 400 }
      );
    }

    // Update flight status and delay time
    booking.flightStatus = "Delayed";
    booking.delayTime = parseFloat(delayHours);
    await booking.save();

    return NextResponse.json({ success: true, booking }, { status: 200 });
  } catch (error) {
    console.error("POST manageflights delay error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const { bookingId } = await req.json();
    if (!bookingId) {
      return NextResponse.json(
        { error: "Booking ID required" },
        { status: 400 }
      );
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    // Update booking status instead of deleting
    booking.status = "Cancelled";
    booking.flightStatus = "Cancelled";
    await booking.save();

    if (booking.paymentIntentId && stripe) {
      try {
        await stripe.refunds.create({
          payment_intent: booking.paymentIntentId,
        });
        console.log(
          `Refund initiated for paymentIntentId: ${booking.paymentIntentId}`
        );
      } catch (err) {
        console.error("Refund error:", err.message);
        // Log but don't fail the cancellation
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE manageflights error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
