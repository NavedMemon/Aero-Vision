import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import TaskHistory from "@/model/TaskHistory";
import Staff from "@/model/Staff";
import Admin from "@/model/Admin";
import connectDB from "@/lib/db";

export async function GET(request) {
  await connectDB();
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const description = searchParams.get("description") || "";
    const name = searchParams.get("name") || "";
    const email = searchParams.get("email") || "";
    const startDate = searchParams.get("startDate") || "";
    const endDate = searchParams.get("endDate") || "";
    const status = searchParams.get("status") || "";

    const query = {};
    if (description) {
      query.description = { $regex: description, $options: "i" };
    }
    if (status) {
      query.status = status;
    }
    if (startDate || endDate) {
      query.assignedAt = {};
      if (startDate) query.assignedAt.$gte = new Date(startDate);
      if (endDate) query.assignedAt.$lte = new Date(endDate);
    }

    let staffIds = [];
    if (name || email) {
      const staffQuery = {};
      if (name) staffQuery.name = { $regex: name, $options: "i" };
      if (email) staffQuery.email = { $regex: email, $options: "i" };
      const staff = await Staff.find(staffQuery).select("_id name email");
      staffIds = staff.map((s) => s._id);
      query.staffId = { $in: staffIds.length ? staffIds : [] };
    }

    const taskHistories = await TaskHistory.find(query)
      .populate("staffId", "name email")
      .populate("adminId", "email")
      .lean();

    const formattedTasks = taskHistories.map((task) => ({
      _id: task._id.toString(),
      description: task.description,
      staffId: task.staffId?._id.toString(),
      staffName: task.staffId?.name || "Unknown",
      staffEmail: task.staffId?.email || "Unknown",
      status: task.status,
      assignedAt: task.assignedAt,
      startedAt: task.startedAt || null,
      completedAt: task.completedAt || null,
      adminEmail: task.adminId?.email || "Unknown",
    }));

    return NextResponse.json({ taskHistories: formattedTasks });
  } catch (err) {
    console.error("Error fetching task history:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  await connectDB();
  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { taskId, description, staffId, status } = await request.json();
    if (!taskId || !description || !staffId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updateData = { description, staffId, status };
    if (status === "Started" && !task.startedAt) {
      updateData.startedAt = new Date();
    } else if (status === "Completed" && !task.completedAt) {
      updateData.completedAt = new Date();
    }

    const task = await TaskHistory.findByIdAndUpdate(taskId, updateData, {
      new: true,
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated" });
  } catch (err) {
    console.error("Error updating task:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
