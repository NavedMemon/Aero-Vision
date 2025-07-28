// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import connectDB from "@/lib/db";
// import Airline from "@/model/Airline";
// import Admin from "@/model/Admin";

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

//     const airlines = await Airline.find().sort({ name: 1 });
//     return NextResponse.json({ success: true, airlines }, { status: 200 });
//   } catch (error) {
//     console.error("GET - Error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   await connectDB();
//   const { name, logo } = await req.json();
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

//     if (!name || !logo) {
//       return NextResponse.json(
//         { error: "Name and logo are required" },
//         { status: 400 }
//       );
//     }

//     const existingAirline = await Airline.findOne({ name });
//     if (existingAirline) {
//       return NextResponse.json(
//         { error: "Airline name already exists" },
//         { status: 400 }
//       );
//     }

//     const airline = new Airline({
//       name: name.trim(),
//       logo: logo.trim(),
//     });
//     await airline.save();

//     return NextResponse.json({ success: true, airline }, { status: 201 });
//   } catch (error) {
//     if (error.name === "JsonWebTokenError") {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }
//     console.error("POST - Error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Airline from "@/model/Airline";
import Admin from "@/model/Admin";
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

    const airlines = await Airline.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, airlines }, { status: 200 });
  } catch (error) {
    console.error("GET - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const { name, logo } = await req.json();
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

    if (!name?.trim() || !logo?.trim()) {
      return NextResponse.json(
        { error: "Name and logo are required" },
        { status: 400 }
      );
    }

    const existingAirline = await Airline.findOne({ name: name.trim() });
    if (existingAirline) {
      return NextResponse.json(
        { error: "Airline name already exists" },
        { status: 400 }
      );
    }

    const airline = new Airline({
      name: name.trim(),
      logo: logo.trim(),
      createdBy: admin._id,
    });
    await airline.save();

    return NextResponse.json({ success: true, airline }, { status: 201 });
  } catch (error) {
    console.error("POST - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectDB();
  const { airlineId, name, logo } = await req.json();
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

    if (!airlineId || !name?.trim() || !logo?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(airlineId)) {
      return NextResponse.json(
        { error: "Invalid airline ID" },
        { status: 400 }
      );
    }

    const existingAirline = await Airline.findOne({
      name: name.trim(),
      _id: { $ne: airlineId },
    });
    if (existingAirline) {
      return NextResponse.json(
        { error: "Airline name already exists" },
        { status: 400 }
      );
    }

    const airline = await Airline.findByIdAndUpdate(
      airlineId,
      {
        name: name.trim(),
        logo: logo.trim(),
      },
      { new: true }
    );
    if (!airline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, airline }, { status: 200 });
  } catch (error) {
    console.error("PUT - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const { airlineId } = await req.json();
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

    if (!airlineId) {
      return NextResponse.json(
        { error: "Airline ID is required" },
        { status: 400 }
      );
    }

    if (!mongoose.isValidObjectId(airlineId)) {
      return NextResponse.json(
        { error: "Invalid airline ID" },
        { status: 400 }
      );
    }

    const airline = await Airline.findByIdAndDelete(airlineId);
    if (!airline) {
      return NextResponse.json({ error: "Airline not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
