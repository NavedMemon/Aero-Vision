import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import Leave from "@/model/Leave";

const JWT_SECRET =
  process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

export async function GET(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;
    console.log("Token received:", token ? "Present" : "Missing");
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Not an admin" },
        { status: 403 }
      );
    }

    const leaves = await Leave.find()
      .populate("staff", "name email role")
      .sort({ createdAt: -1 });

    console.log("Fetched leaves:", leaves.length);
    return NextResponse.json(leaves, { status: 200 });
  } catch (error) {
    console.error("Error fetching leaves:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to fetch leaves" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;
    console.log("Token received:", token ? "Present" : "Missing");
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Not an admin" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const leaveId = searchParams.get("id");
    const { status } = await req.json();

    if (!leaveId || !status) {
      console.log("Missing required fields:", { leaveId, status });
      return NextResponse.json(
        { error: "Leave ID and status are required" },
        { status: 400 }
      );
    }

    if (!["Accepted", "Rejected"].includes(status)) {
      console.log("Invalid status:", status);
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const leave = await Leave.findById(leaveId).populate(
      "staff",
      "name email role"
    );
    if (!leave) {
      console.log("Leave not found:", leaveId);
      return NextResponse.json({ error: "Leave not found" }, { status: 404 });
    }

    if (leave.status !== "Pending") {
      console.log("Leave already processed:", leaveId, leave.status);
      return NextResponse.json(
        { error: "Leave already processed" },
        { status: 400 }
      );
    }

    leave.status = status;
    await leave.save();

    console.log("Leave updated:", leave._id, status);
    return NextResponse.json({ leave }, { status: 200 });
  } catch (error) {
    console.error("Error updating leave:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to update leave" },
      { status: 500 }
    );
  }
}
