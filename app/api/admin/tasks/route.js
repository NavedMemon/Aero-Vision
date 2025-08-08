import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/model/Task";
import Notification from "@/model/Notification";
import Staff from "@/model/Staff";
import jwt from "jsonwebtoken";
import TaskHistory from "@/model/TaskHistory";

export async function POST(req) {
  await connectDB();
  try {
    const { staffEmails, description } = await req.json();
    if (!staffEmails || staffEmails.length === 0 || !description) {
      return NextResponse.json(
        { error: "Missing staff emails or task description" },
        { status: 400 }
      );
    }

    // Verify admin token
    const token = req.cookies.get("token")?.value;
    console.log("Token received:", token); // Debug
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded token:", decoded); // Debug
    } catch (error) {
      console.error("Token verification error:", error.message);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // Case-insensitive admin role check
    if (!decoded.id || decoded.role.toLowerCase() !== "admin") {
      console.log("Unauthorized user:", { id: decoded.id, role: decoded.role }); // Debug
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find staff IDs for emails
    const staffMembers = await Staff.find({
      email: { $in: staffEmails },
    }).select("_id email");
    console.log("Found staff:", staffMembers); // Debug
    if (staffMembers.length !== staffEmails.length) {
      return NextResponse.json(
        { error: "Some staff emails not found" },
        { status: 404 }
      );
    }

    // Create task
    const task = await Task.create({
      description,
      staffIds: staffMembers.map((s) => s._id),
      adminId: decoded.id,
    });

    // Create notifications for each staff
    const notifications = await Notification.insertMany(
      staffMembers.map((staff) => ({
        userId: staff._id,
        userModel: "Staff",
        text: "You have a new task assigned by admin",
        taskId: task._id,
        read: false,
      }))
    );

    // Create task history entries
    await TaskHistory.insertMany(
      staffMembers.map((staff) => ({
        taskId: task._id,
        description,
        staffId: staff._id,
        adminId: decoded.id,
        status: "Assigned",
      }))
    );

    return NextResponse.json({ task, notifications }, { status: 201 });
  } catch (error) {
    console.error("Error assigning task:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
