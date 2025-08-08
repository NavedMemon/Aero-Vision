import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/model/Task";
import TaskHistory from "@/model/TaskHistory";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();
  try {
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

    const taskHistories = await TaskHistory.find({
      staffId: decoded.id,
      status: { $in: ["Assigned", "Started"] },
    }).populate({
      path: "taskId",
      select: "description",
    });

    const tasks = taskHistories.map((history) => ({
      taskHistoryId: history._id,
      description: history.description,
      status: history.status,
      assignedAt: history.assignedAt,
      startedAt: history.startedAt,
    }));

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
