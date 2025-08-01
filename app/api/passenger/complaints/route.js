import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Complaint from "@/model/Complaint";
import Passenger from "@/model/Passenger";

export async function POST(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      console.error("No token provided in request");
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded JWT:", decoded);
    } catch (error) {
      console.error("JWT verification failed:", error.message);
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    if (!decoded.id) {
      console.error("No id in decoded token");
      return NextResponse.json(
        { error: "Unauthorized: Missing id in token" },
        { status: 401 }
      );
    }

    if (decoded.role !== "passenger") {
      console.error(`Invalid role: ${decoded.role}`);
      return NextResponse.json(
        { error: "Forbidden: Passenger access required" },
        { status: 403 }
      );
    }

    const user = await Passenger.findById(decoded.id);
    if (!user) {
      console.error(`Passenger not found for id: ${decoded.id}`);
      return NextResponse.json(
        { error: "Unauthorized: Passenger not found" },
        { status: 401 }
      );
    }

    const { name, title, description } = await req.json();
    if (!name || !title || !description) {
      console.error("Missing required fields:", { name, title, description });
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const priority = description.toLowerCase().includes("urgent")
      ? "High"
      : description.length > 100
      ? "Medium"
      : "Low";

    const complaint = new Complaint({
      type: "passenger",
      id: decoded.id,
      typeModel: "Passenger",
      name,
      title,
      description,
      priority,
    });

    await complaint.save();
    console.log("Complaint saved:", complaint._id);
    return NextResponse.json({ success: true, complaint }, { status: 201 });
  } catch (error) {
    console.error("POST passenger complaints error:", error.message);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      console.error("No token provided in GET request");
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      console.error("No id in decoded token for GET");
      return NextResponse.json(
        { error: "Unauthorized: Missing id in token" },
        { status: 401 }
      );
    }

    if (decoded.role !== "passenger") {
      console.error(`Invalid role for GET: ${decoded.role}`);
      return NextResponse.json(
        { error: "Forbidden: Passenger access required" },
        { status: 403 }
      );
    }

    const complaints = await Complaint.find({
      id: decoded.id,
      type: "passenger",
    }).sort({ submittedAt: -1 });
    return NextResponse.json({ complaints });
  } catch (error) {
    console.error("GET passenger complaints error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
