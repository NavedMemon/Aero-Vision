import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Complaint from "@/model/Complaint";
import Passenger from "@/model/Passenger";
import Staff from "@/model/Staff";

export async function GET(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      console.error("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      console.error("No id in decoded token");
      return NextResponse.json(
        { error: "Unauthorized: Missing id in token" },
        { status: 401 }
      );
    }

    if (decoded.role !== "admin") {
      console.error(`Invalid role: ${decoded.role}`);
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const complaints = await Complaint.find().sort({ submittedAt: -1 });

    const populatedComplaints = await Promise.all(
      complaints.map(async (complaint) => {
        const model = complaint.typeModel === "Passenger" ? Passenger : Staff;
        const user = await model.findById(complaint.id).select("email name");
        return {
          ...complaint.toObject(),
          id: user
            ? { _id: user._id, email: user.email, name: user.name }
            : null,
        };
      })
    );

    return NextResponse.json({ complaints: populatedComplaints });
  } catch (error) {
    console.error("GET managecomplaints error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      console.error("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      console.error("No id in decoded token");
      return NextResponse.json(
        { error: "Unauthorized: Missing id in token" },
        { status: 401 }
      );
    }

    if (decoded.role !== "admin") {
      console.error(`Invalid role: ${decoded.role}`);
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const complaintId = body.id?._id || body._id || body.id;
    const { status } = body;

    if (!complaintId || !status) {
      console.error("Missing required fields:", { complaintId, status });
      return NextResponse.json(
        { error: "Complaint ID and status are required" },
        { status: 400 }
      );
    }

    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      console.error(`Complaint not found for id: ${complaintId}`);
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      );
    }

    complaint.status = status;

    const description = complaint.description.toLowerCase();
    const highPriorityKeywords = ["urgent", "emergency", "safety", "critical"];
    const mediumPriorityKeywords = ["delay", "equipment", "technical", "issue"];
    complaint.priority = highPriorityKeywords.some((keyword) =>
      description.includes(keyword)
    )
      ? "High"
      : mediumPriorityKeywords.some((keyword) => description.includes(keyword))
      ? "Medium"
      : "Low";

    await complaint.save();
    console.log("Complaint status updated:", complaint._id);
    return NextResponse.json({ success: true, complaint });
  } catch (error) {
    console.error("PUT managecomplaints error:", error.message);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      console.error("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      console.error("No id in decoded token");
      return NextResponse.json(
        { error: "Unauthorized: Missing id in token" },
        { status: 401 }
      );
    }

    if (decoded.role !== "admin") {
      console.error(`Invalid role: ${decoded.role}`);
      return NextResponse.json(
        { error: "Forbidden: Admin access required" },
        { status: 403 }
      );
    }

    const { id: complaintId } = await req.json();
    if (!complaintId) {
      console.error("No complaint ID provided");
      return NextResponse.json(
        { error: "Complaint ID required" },
        { status: 400 }
      );
    }

    const complaint = await Complaint.findByIdAndDelete(complaintId);
    if (!complaint) {
      console.error(`Complaint not found for id: ${complaintId}`);
      return NextResponse.json(
        { error: "Complaint not found" },
        { status: 404 }
      );
    }

    console.log("Complaint deleted:", complaintId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE managecomplaints error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
