// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Task from "@/model/Task";
// import TaskHistory from "@/model/TaskHistory";
// import jwt from "jsonwebtoken";

// export async function GET(req) {
//   await connectDB();
//   try {
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       console.error("Token verification error:", error.message);
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     if (!decoded.id || decoded.role !== "staff") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const taskHistories = await TaskHistory.find({
//       staffId: decoded.id,
//       status: { $in: ["Assigned", "Started"] },
//     }).populate({
//       path: "taskId",
//       select: "description",
//     });

//     const tasks = taskHistories.map((history) => ({
//       taskHistoryId: history._id,
//       description: history.description,
//       status: history.status,
//       assignedAt: history.assignedAt,
//       startedAt: history.startedAt,
//     }));

//     return NextResponse.json({ tasks }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Task from "@/model/Task";
// import TaskHistory from "@/model/TaskHistory";
// import Staff from "@/model/Staff";
// import Notification from "@/model/Notification";
// import jwt from "jsonwebtoken";

// export async function GET(req) {
//   await connectDB();
//   try {
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       console.error("Token verification error:", error.message);
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     if (!decoded.id || decoded.role !== "staff") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const url = new URL(req.url);
//     const taskId = url.searchParams.get("taskId");

//     let taskHistories;
//     const staff = await Staff.findById(decoded.id).select("isTeamLeader role");

//     if (taskId) {
//       taskHistories = await TaskHistory.find({
//         taskId,
//         staffId: decoded.id,
//         status: { $in: ["Assigned", "Started"] },
//       }).populate({
//         path: "taskId",
//         select: "title description",
//       });
//     } else {
//       taskHistories = await TaskHistory.find({
//         staffId: decoded.id,
//         status: { $in: ["Assigned", "Started"] },
//         ...(staff.isTeamLeader
//           ? { assignedByTeamLeader: { $exists: false } }
//           : {}),
//       }).populate({
//         path: "taskId",
//         select: "title description",
//       });
//     }

//     const tasks = taskHistories.map((history) => ({
//       taskId: history.taskId._id,
//       taskHistoryId: history._id,
//       title: history.taskId.title,
//       description: history.taskId.description || history.description,
//       status: history.status,
//       assignedAt: history.assignedAt,
//       startedAt: history.startedAt,
//     }));

//     console.log("Raw taskHistories:", taskHistories);
//     console.log("Fetched tasks for staff:", decoded.id, tasks);
//     return NextResponse.json(
//       { tasks, isTeamLeader: staff.isTeamLeader },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function PUT(req) {
//   await connectDB();
//   try {
//     const { taskHistoryId, status } = await req.json();
//     if (!taskHistoryId || !["Started", "Completed"].includes(status)) {
//       return NextResponse.json(
//         { error: "Invalid task ID or status" },
//         { status: 400 }
//       );
//     }

//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       console.error("Token verification error:", error.message);
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     if (!decoded.id || decoded.role !== "staff") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const update =
//       status === "Started"
//         ? { status, startedAt: new Date() }
//         : { status, completedAt: new Date() };

//     const taskHistory = await TaskHistory.findOneAndUpdate(
//       { _id: taskHistoryId, staffId: decoded.id, status: { $ne: "Completed" } },
//       { $set: update },
//       { new: true }
//     );

//     if (!taskHistory) {
//       return NextResponse.json(
//         { error: "Task not found or already completed" },
//         { status: 404 }
//       );
//     }

//     if (status === "Completed") {
//       await Task.findByIdAndUpdate(taskHistory.taskId, {
//         status: "Completed",
//         completedAt: new Date(),
//       });
//     }

//     return NextResponse.json({ taskHistory }, { status: 200 });
//   } catch (error) {
//     console.error("Error updating task:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   await connectDB();
//   try {
//     const { taskId, taskHistoryId, teammateIds } = await req.json();
//     if (!taskId || !taskHistoryId || !teammateIds || teammateIds.length === 0) {
//       return NextResponse.json(
//         { error: "Task ID, task history ID, and teammate IDs are required" },
//         { status: 400 }
//       );
//     }

//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (error) {
//       console.error("Token verification error:", error.message);
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     if (!decoded.id || decoded.role !== "staff") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const teamLeader = await Staff.findById(decoded.id);
//     if (!teamLeader || !teamLeader.isTeamLeader) {
//       return NextResponse.json(
//         { error: "Only team leaders can assign tasks" },
//         { status: 403 }
//       );
//     }

//     const task = await Task.findById(taskId);
//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     const taskHistory = await TaskHistory.findById(taskHistoryId);
//     if (!taskHistory || taskHistory.staffId.toString() !== decoded.id) {
//       return NextResponse.json(
//         { error: "Task history not found or not assigned to you" },
//         { status: 404 }
//       );
//     }

//     const teammates = await Staff.find({
//       _id: { $in: teammateIds },
//       role: task.department,
//       isTeamLeader: false,
//     });

//     if (teammates.length !== teammateIds.length) {
//       return NextResponse.json(
//         { error: "Some teammates are invalid or not in the department" },
//         { status: 400 }
//       );
//     }

//     const newTaskHistories = teammates.map((teammate) => ({
//       taskId: task._id,
//       description: task.description,
//       staffId: teammate._id,
//       assignedBy: decoded.id,
//       assignedByModel: "Staff",
//       assignedToTeammateAt: new Date(),
//       assignedByTeamLeader: decoded.id,
//       status: "Assigned",
//     }));

//     await TaskHistory.insertMany(newTaskHistories);

//     await TaskHistory.findByIdAndUpdate(taskHistoryId, {
//       status: "Delegated",
//       startedAt: new Date(),
//     });

//     await Task.findByIdAndUpdate(taskId, {
//       finalAssignee: teammateIds,
//       status: "In Progress",
//     });

//     const notifications = teammates.map((teammate) => ({
//       taskId: task._id,
//       userId: teammate._id,
//       userModel: "Staff",
//       text: `You have been assigned a new task by team leader: ${task.title}`,
//       read: false,
//     }));

//     await Notification.insertMany(notifications);

//     console.log(
//       "Task assigned to teammates:",
//       teammateIds,
//       "Notifications created:",
//       notifications.length
//     );
//     return NextResponse.json(
//       { message: "Task assigned successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error assigning task:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/model/Task";
import TaskHistory from "@/model/TaskHistory";
import Staff from "@/model/Staff";
import Notification from "@/model/Notification";
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

    const url = new URL(req.url);
    const taskId = url.searchParams.get("taskId");

    let taskHistories;
    const staff = await Staff.findById(decoded.id).select("isTeamLeader role");

    if (taskId) {
      taskHistories = await TaskHistory.find({
        taskId,
        staffId: decoded.id,
        status: { $in: ["Assigned", "Started"] },
      }).populate({
        path: "taskId",
        select: "title description",
      });
    } else {
      taskHistories = await TaskHistory.find({
        staffId: decoded.id,
        status: { $in: ["Assigned", "Started"] },
        ...(staff.isTeamLeader
          ? { assignedByTeamLeader: { $exists: false } }
          : {}),
      }).populate({
        path: "taskId",
        select: "title description",
      });
    }

    const tasks = taskHistories.map((history) => ({
      taskId: history.taskId._id,
      taskHistoryId: history._id,
      title: history.taskId.title,
      description: history.taskId.description || history.description,
      status: history.status,
      assignedAt: history.assignedAt,
      startedAt: history.startedAt,
      rejectionCount: history.rejectionCount,
      rejectionReason: history.rejectionReason,
    }));

    console.log("Raw taskHistories:", JSON.stringify(taskHistories, null, 2));
    console.log(
      "Fetched tasks for staff:",
      decoded.id,
      JSON.stringify(tasks, null, 2)
    );
    return NextResponse.json(
      { tasks, isTeamLeader: staff.isTeamLeader },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
      {
        _id: taskHistoryId,
        staffId: decoded.id,
        status: { $in: ["Assigned", "Rejected"] },
      },
      { $set: update },
      { new: true }
    );

    if (!taskHistory) {
      return NextResponse.json(
        { error: "Task not found or not in assignable status" },
        { status: 404 }
      );
    }

    if (status === "Completed") {
      await Task.findByIdAndUpdate(taskHistory.taskId, {
        status: "Completed",
      });
    }

    console.log("Updated task:", taskHistoryId, update);
    return NextResponse.json({ taskHistory }, { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  try {
    const { taskId, taskHistoryId, teammateIds } = await req.json();
    if (!taskId || !taskHistoryId || !teammateIds || teammateIds.length === 0) {
      return NextResponse.json(
        { error: "Task ID, task history ID, and teammate IDs are required" },
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

    const teamLeader = await Staff.findById(decoded.id);
    if (!teamLeader || !teamLeader.isTeamLeader) {
      return NextResponse.json(
        { error: "Only team leaders can assign tasks" },
        { status: 403 }
      );
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const taskHistory = await TaskHistory.findById(taskHistoryId);
    if (!taskHistory || taskHistory.staffId.toString() !== decoded.id) {
      return NextResponse.json(
        { error: "Task history not found or not assigned to you" },
        { status: 404 }
      );
    }

    const teammates = await Staff.find({
      _id: { $in: teammateIds },
      role: task.department,
      isTeamLeader: false,
    });

    if (teammates.length !== teammateIds.length) {
      return NextResponse.json(
        { error: "Some teammates are invalid or not in the department" },
        { status: 400 }
      );
    }

    const newTaskHistories = teammates.map((teammate) => ({
      taskId: task._id,
      description: task.description,
      staffId: teammate._id,
      assignedBy: decoded.id,
      assignedByModel: "Staff",
      assignedByTeamLeader: decoded.id,
      status: "Assigned",
      assignedAt: new Date(),
      rejectionCount: 0,
    }));

    await TaskHistory.insertMany(newTaskHistories);

    await TaskHistory.findByIdAndUpdate(taskHistoryId, {
      status: "Delegated",
      startedAt: new Date(),
    });

    await Task.findByIdAndUpdate(taskId, {
      finalAssignee: teammateIds,
      status: "In Progress",
    });

    const notifications = teammates.map((teammate) => ({
      taskId: task._id,
      userId: teammate._id,
      userModel: "Staff",
      text: `You have been assigned a new task by team leader: ${task.title}`,
      read: false,
    }));

    await Notification.insertMany(notifications);

    console.log(
      "Task assigned to teammates:",
      teammateIds,
      "Notifications created:",
      notifications.length
    );
    return NextResponse.json(
      { message: "Task assigned successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error assigning task:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
