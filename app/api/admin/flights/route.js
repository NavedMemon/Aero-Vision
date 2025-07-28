// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import connectDB from "@/lib/db";
// import Flight from "@/model/Flight";
// import Admin from "@/model/Admin";
// import Airline from "@/model/Airline";
// import Gate from "@/model/Gate";

// export async function GET(req) {
//   await connectDB();
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { error: "Unauthorized: No token provided" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//     }

//     const flights = await Flight.find()
//       .populate("airline", "name logo")
//       .populate("gate", "gateNumber")
//       .populate("createdBy", "email")
//       .sort({ createdAt: -1 });
//     return NextResponse.json({ success: true, flights }, { status: 200 });
//   } catch (error) {
//     console.error("GET - Error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   await connectDB();
//   const {
//     flightNumber,
//     airline,
//     from,
//     to,
//     departure,
//     status,
//     type,
//     price,
//     baggageAllowance,
//     gate,
//   } = await req.json();
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { error: "Unauthorized: No token provided" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//     }

//     if (
//       !flightNumber ||
//       !airline ||
//       !from ||
//       !to ||
//       !departure ||
//       !status ||
//       !type ||
//       !price ||
//       !baggageAllowance ||
//       !gate
//     ) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const existingFlight = await Flight.findOne({ flightNumber });
//     if (existingFlight) {
//       return NextResponse.json(
//         { error: "Flight number already exists" },
//         { status: 400 }
//       );
//     }

//     const flight = new Flight({
//       flightNumber: flightNumber.trim(),
//       airline,
//       from: from.trim(),
//       to: to.trim(),
//       departure: new Date(departure),
//       status,
//       type,
//       price: parseFloat(price),
//       baggageAllowance: baggageAllowance.trim(),
//       gate,
//       createdBy: admin._id,
//     });
//     await flight.save();

//     return NextResponse.json({ success: true, flight }, { status: 201 });
//   } catch (error) {
//     if (error.name === "JsonWebTokenError") {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }
//     console.error("POST - Error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function PUT(req) {
//   await connectDB();
//   const {
//     flightId,
//     flightNumber,
//     airline,
//     from,
//     to,
//     departure,
//     status,
//     type,
//     price,
//     baggageAllowance,
//     gate,
//   } = await req.json();
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { error: "Unauthorized: No token provided" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//     }

//     if (
//       !flightId ||
//       !flightNumber ||
//       !airline ||
//       !from ||
//       !to ||
//       !departure ||
//       !status ||
//       !type ||
//       !price ||
//       !baggageAllowance ||
//       !gate
//     ) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const existingFlight = await Flight.findOne({
//       flightNumber,
//       _id: { $ne: flightId },
//     });
//     if (existingFlight) {
//       return NextResponse.json(
//         { error: "Flight number already exists" },
//         { status: 400 }
//       );
//     }

//     const flight = await Flight.findByIdAndUpdate(
//       flightId,
//       {
//         flightNumber: flightNumber.trim(),
//         airline,
//         from: from.trim(),
//         to: to.trim(),
//         departure: new Date(departure),
//         status,
//         type,
//         price: parseFloat(price),
//         baggageAllowance: baggageAllowance.trim(),
//         gate,
//       },
//       { new: true }
//     );
//     if (!flight) {
//       return NextResponse.json({ error: "Flight not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, flight }, { status: 200 });
//   } catch (error) {
//     console.error("PUT - Error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function DELETE(req) {
//   await connectDB();
//   const { flightId } = await req.json();
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { error: "Unauthorized: No token provided" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//     }

//     if (!flightId) {
//       return NextResponse.json(
//         { error: "Flight ID is required" },
//         { status: 400 }
//       );
//     }

//     const flight = await Flight.findByIdAndDelete(flightId);
//     if (!flight) {
//       return NextResponse.json({ error: "Flight not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("DELETE - Error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Flight from "@/model/Flight";
import Admin from "@/model/Admin";
import Airline from "@/model/Airline";
import Gate from "@/model/Gate";
import mongoose from "mongoose";

export async function GET(req) {
  await connectDB();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.log("GET - Admin not found for id:", decoded.id);
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const flights = await Flight.find()
      .populate("airline", "name logo")
      .populate("gate", "gateNumber")
      .populate("createdBy", "email")
      .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, flights }, { status: 200 });
  } catch (error) {
    console.error("GET - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const {
    flightNumber,
    airline,
    from,
    to,
    departure,
    status,
    type,
    price,
    baggageAllowance,
    gate,
  } = await req.json();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.log("POST - Admin not found for id:", decoded.id);
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (
      !flightNumber?.trim() ||
      !airline ||
      !from?.trim() ||
      !to?.trim() ||
      !departure ||
      !status ||
      !type ||
      !price ||
      !baggageAllowance?.trim() ||
      !gate
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(airline)) {
      return NextResponse.json(
        { error: "Invalid airline ID" },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(gate)) {
      return NextResponse.json({ error: "Invalid gate ID" }, { status: 400 });
    }

    const validAirline = await Airline.findById(airline);
    if (!validAirline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    const validGate = await Gate.findById(gate);
    if (!validGate) {
      return NextResponse.json({ error: "Gate not found" }, { status: 404 });
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 }
      );
    }

    if (!["On Time", "Delayed", "Cancelled"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    if (!["Domestic", "International"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type value" },
        { status: 400 }
      );
    }

    const existingFlight = await Flight.findOne({
      flightNumber: flightNumber.trim(),
    });
    if (existingFlight) {
      return NextResponse.json(
        { error: "Flight number already exists" },
        { status: 400 }
      );
    }

    const flight = new Flight({
      flightNumber: flightNumber.trim(),
      airline,
      from: from.trim(),
      to: to.trim(),
      departure: new Date(departure),
      status,
      type,
      price: parseFloat(price),
      baggageAllowance: baggageAllowance.trim(),
      gate,
      createdBy: admin._id,
    });
    await flight.save();

    return NextResponse.json({ success: true, flight }, { status: 201 });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    console.error("POST - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectDB();
  const {
    flightId,
    flightNumber,
    airline,
    from,
    to,
    departure,
    status,
    type,
    price,
    baggageAllowance,
    gate,
  } = await req.json();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.log("PUT - Admin not found for id:", decoded.id);
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (
      !flightId ||
      !flightNumber?.trim() ||
      !airline ||
      !from?.trim() ||
      !to?.trim() ||
      !departure ||
      !status ||
      !type ||
      !price ||
      !baggageAllowance?.trim() ||
      !gate
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(flightId)) {
      return NextResponse.json({ error: "Invalid flight ID" }, { status: 400 });
    }

    if (!mongoose.isValidObjectId(airline)) {
      return NextResponse.json(
        { error: "Invalid airline ID" },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(gate)) {
      return NextResponse.json({ error: "Invalid gate ID" }, { status: 400 });
    }

    const validAirline = await Airline.findById(airline);
    if (!validAirline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    const validGate = await Gate.findById(gate);
    if (!validGate) {
      return NextResponse.json({ error: "Gate not found" }, { status: 404 });
    }

    if (isNaN(price) || parseFloat(price) <= 0) {
      return NextResponse.json(
        { error: "Price must be a positive number" },
        { status: 400 }
      );
    }

    if (!["On Time", "Delayed", "Cancelled"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    if (!["Domestic", "International"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type value" },
        { status: 400 }
      );
    }

    const existingFlight = await Flight.findOne({
      flightNumber: flightNumber.trim(),
      _id: { $ne: flightId },
    });
    if (existingFlight) {
      return NextResponse.json(
        { error: "Flight number already exists" },
        { status: 400 }
      );
    }

    const flight = await Flight.findByIdAndUpdate(
      flightId,
      {
        flightNumber: flightNumber.trim(),
        airline,
        from: from.trim(),
        to: to.trim(),
        departure: new Date(departure),
        status,
        type,
        price: parseFloat(price),
        baggageAllowance: baggageAllowance.trim(),
        gate,
      },
      { new: true }
    );
    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, flight }, { status: 200 });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    console.error("PUT - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const { flightId } = await req.json();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.log("DELETE - Admin not found for id:", decoded.id);
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (!flightId) {
      return NextResponse.json(
        { error: "Flight ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(flightId)) {
      return NextResponse.json({ error: "Invalid flight ID" }, { status: 400 });
    }

    const flight = await Flight.findByIdAndDelete(flightId);
    if (!flight) {
      return NextResponse.json({ error: "Flight not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    console.error("DELETE - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
