import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TaskHistory from "@/model/TaskHistory";
import Task from "@/model/Task";
import Notification from "@/model/Notification";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      console.log("No token provided in request");
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Token verified. Payload:", JSON.stringify(decoded, null, 2));
    } catch (error) {
      console.error("Token verification error:", error.message);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decoded.id || decoded.role !== "admin") {
      console.log("Unauthorized access attempt:", decoded);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminTasks = await Task.find({
      assignedBy: decoded.id,
      assignedByModel: "Admin",
    }).select("_id");

    const taskIds = adminTasks.map((task) => task._id);

    const query = {
      taskId: { $in: taskIds },
      status: "Completed",
      acceptedByTeamLeader: true,
      adminAcceptedAt: null,
    };
    console.log("Querying TaskHistory with:", JSON.stringify(query, null, 2));
    const taskHistories = await TaskHistory.find(query).populate({
      path: "taskId",
      select: "title description",
    });

    if (taskHistories.length === 0) {
      console.log("No tasks found for admin:", decoded.id);
    }

    const tasks = taskHistories.map((history) => ({
      taskId: history.taskId._id,
      taskHistoryId: history._id,
      title: history.taskId.title,
      description: history.taskId.description || history.description,
      status: history.status,
      assignedAt: history.assignedAt,
      completedAt: history.completedAt,
      rejectionCount: history.rejectionCount,
      rejectionReason: history.rejectionReason,
      acceptedByTeamLeader: history.acceptedByTeamLeader,
    }));

    console.log("Raw taskHistories:", JSON.stringify(taskHistories, null, 2));
    console.log(
      "Fetched task history for admin:",
      decoded.id,
      JSON.stringify(tasks, null, 2)
    );
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching admin task history:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectDB();
  try {
    const { taskHistoryId, action, rejectionReason } = await req.json();
    if (!taskHistoryId || !["Accept", "Reject"].includes(action)) {
      console.log("Invalid request body:", { taskHistoryId, action });
      return NextResponse.json(
        { error: "Invalid task history ID or action" },
        { status: 400 }
      );
    }
    if (action === "Reject" && !rejectionReason) {
      console.log("Rejection reason missing for task:", taskHistoryId);
      return NextResponse.json(
        { error: "Rejection reason is required" },
        { status: 400 }
      );
    }

    const token = req.cookies.get("token")?.value;
    if (!token) {
      console.log("No token provided in PUT request");
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(
        "Token verified for PUT. Payload:",
        JSON.stringify(decoded, null, 2)
      );
    } catch (error) {
      console.error("Token verification error:", error.message);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (!decoded.id || decoded.role !== "admin") {
      console.log("Unauthorized PUT attempt:", decoded);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const taskHistory = await TaskHistory.findOne({
      _id: taskHistoryId,
      status: "Completed",
      acceptedByTeamLeader: true,
      adminAcceptedAt: null,
    }).populate({
      path: "taskId",
      match: { assignedBy: decoded.id, assignedByModel: "Admin" },
      select: "title description",
    });

    if (!taskHistory || !taskHistory.taskId) {
      console.log(
        "Task history not found or invalid for taskHistoryId:",
        taskHistoryId,
        "Conditions:",
        {
          _id: taskHistoryId,
          status: "Completed",
          acceptedByTeamLeader: true,
          adminAcceptedAt: null,
          taskAssignedBy: decoded.id,
          taskAssignedByModel: "Admin",
        }
      );
      return NextResponse.json(
        {
          error:
            "Task history not found, not in Completed status, or not assigned by admin",
        },
        { status: 404 }
      );
    }

    let update = {};
    if (action === "Accept") {
      update = { adminAcceptedAt: new Date() };
    } else {
      update = {
        acceptedByTeamLeader: false,
        adminRejectedAt: new Date(),
        adminRejectionCount: taskHistory.adminRejectionCount + 1,
        adminRejectionReason: rejectionReason,
      };
      const notification = new Notification({
        taskId: taskHistory.taskId._id,
        userId: taskHistory.assignedByTeamLeader,
        userModel: "Staff",
        text: `Task rejected by admin: ${taskHistory.taskId.title}. Reason: ${rejectionReason}`,
        read: false,
      });
      await notification.save();
      console.log(
        "Team leader notification created:",
        JSON.stringify(notification, null, 2)
      );
    }

    const updatedTaskHistory = await TaskHistory.findByIdAndUpdate(
      taskHistoryId,
      { $set: update },
      { new: true }
    );

    await Task.findByIdAndUpdate(taskHistory.taskId._id, {
      status: action === "Accept" ? "Completed" : "In Progress",
    });

    console.log(
      `${action} task:`,
      taskHistoryId,
      JSON.stringify(update, null, 2)
    );
    return NextResponse.json(
      { taskHistory: updatedTaskHistory },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing admin task:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
