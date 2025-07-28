import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Booking from "@/model/Booking";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

export async function GET(request, { params }) {
  await connectDB();
  try {
    const token = request.cookies.get("token")?.value;
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

    const { flightId } = params; // Access flightId directly from params
    if (!flightId) {
      return NextResponse.json(
        { error: "Flight ID is required" },
        { status: 400 }
      );
    }

    const bookings = await Booking.find({
      flight: flightId,
      status: "Confirmed",
    });
    const bookedSeats = bookings.flatMap((b) => b.seats);
    console.log(`Booked seats for flight ${flightId}:`, bookedSeats);
    return NextResponse.json({ bookedSeats });
  } catch (error) {
    console.error("GET seats error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
