import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TaskHistory from "@/model/TaskHistory";
import jwt from "jsonwebtoken";

export async function PUT(req) {
  await connectDB();
  try {
    const { taskHistoryId, status } = await req.json();
    if (!taskHistoryId || !["Started", "Completed"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid task ID or status" },
        { status: 400 }
      );
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("Token verification error:", error.message);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decoded.id || decoded.role !== "staff") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const update =
      status === "Started"
        ? { status, startedAt: new Date() }
        : { status, completedAt: new Date() };

    const taskHistory = await TaskHistory.findOneAndUpdate(
      { _id: taskHistoryId, staffId: decoded.id, status: { $ne: "Completed" } },
      { $set: update },
      { new: true }
    );

    if (!taskHistory) {
      return NextResponse.json(
        { error: "Task not found or already completed" },
        { status: 404 }
      );
    }

    return NextResponse.json({ taskHistory }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
