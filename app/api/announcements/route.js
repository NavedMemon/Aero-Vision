// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Announcement from "@/model/Announcement";
// import Staff from "@/model/Staff";
// import Passenger from "@/model/Passenger";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export async function GET(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!["staff", "passenger"].includes(decoded.role)) {
//       console.log("Unauthorized role:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Staff or Passenger access required" },
//         { status: 403 }
//       );
//     }

//     let announcements = [];
//     if (decoded.role === "staff") {
//       const staff = await Staff.findById(decoded.id);
//       if (!staff) {
//         return NextResponse.json({ error: "Staff not found" }, { status: 404 });
//       }
//       announcements = await Announcement.find({
//         $or: [{ audience: "All" }, { audience: "Staff", role: staff.role }],
//       }).sort({ createdAt: -1 });
//       console.log(
//         `Fetched announcements for staff (role: ${staff.role}):`,
//         announcements.length
//       );
//     } else if (decoded.role === "passenger") {
//       const passenger = await Passenger.findById(decoded.id);
//       if (!passenger) {
//         return NextResponse.json(
//           { error: "Passenger not found" },
//           { status: 404 }
//         );
//       }
//       announcements = await Announcement.find({
//         $or: [
//           { audience: "All" },
//           { audience: "Passenger", flight: passenger.flight },
//         ],
//       }).sort({ createdAt: -1 });
//       console.log(
//         `Fetched announcements for passenger (flight: ${passenger.flight}):`,
//         announcements.length
//       );
//     }

//     return NextResponse.json({ announcements });
//   } catch (error) {
//     console.error("Error fetching announcements:", error.message);
//     return NextResponse.json(
//       { error: "Failed to fetch announcements: " + error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Announcement from "@/model/Announcement";
import Staff from "@/model/Staff";
import Passenger from "@/model/Passenger";
import Booking from "@/model/Booking";
import Flight from "@/model/Flight";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectDB();
    console.log("Models available:", Object.keys(mongoose.models));
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!["staff", "passenger"].includes(decoded.role)) {
      console.log("Unauthorized role:", decoded.role);
      return NextResponse.json(
        { error: "Unauthorized: Staff or Passenger access required" },
        { status: 403 }
      );
    }

    let announcements = [];
    if (decoded.role === "staff") {
      const staff = await Staff.findById(decoded.id);
      if (!staff) {
        return NextResponse.json({ error: "Staff not found" }, { status: 404 });
      }
      announcements = await Announcement.find({
        $or: [{ audience: "All" }, { audience: "Staff", role: staff.role }],
      }).sort({ createdAt: -1 });
      console.log(
        `Fetched announcements for staff (role: ${staff.role}):`,
        announcements.length
      );
    } else if (decoded.role === "passenger") {
      const passenger = await Passenger.findById(decoded.id);
      if (!passenger) {
        return NextResponse.json(
          { error: "Passenger not found" },
          { status: 404 }
        );
      }
      const bookings = await Booking.find({
        passenger: decoded.id,
        status: "Confirmed",
      }).populate("flight");
      const flightNumbers = bookings
        .filter((b) => b.flight)
        .map((b) => b.flight.flightNumber);
      console.log(`Flight numbers for passenger ${decoded.id}:`, flightNumbers);
      announcements = await Announcement.find({
        $or: [
          { audience: "All" },
          { audience: "Passenger", flight: { $in: flightNumbers } },
          { audience: "Passenger", flight: null },
        ],
      }).sort({ createdAt: -1 });
      console.log(
        `Fetched announcements for passenger (flights: ${flightNumbers.join(
          ", "
        )}):`,
        announcements.length
      );
    }

    return NextResponse.json({ announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch announcements: " + error.message },
      { status: 500 }
    );
  }
}
