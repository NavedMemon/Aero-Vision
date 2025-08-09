// import
//  { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import TaskHistory from "@/model/TaskHistory";
// import Staff from "@/model/Staff";
// import Task from "@/model/Task";
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

//     const staff = await Staff.findById(decoded.id).select("isTeamLeader");
//     if (!staff.isTeamLeader) {
//       return NextResponse.json(
//         { error: "Only team leaders can view task history" },
//         { status: 403 }
//       );
//     }

//     const taskHistories = await TaskHistory.find({
//       assignedByTeamLeader: decoded.id,
//       status: "Completed",
//       acceptedByTeamLeader: false, // Exclude accepted tasks
//     }).populate({
//       path: "taskId",
//       select: "title description",
//     });

//     const tasks = taskHistories.map((history) => ({
//       taskId: history.taskId._id,
//       taskHistoryId: history._id,
//       title: history.taskId.title,
//       description: history.taskId.description || history.description,
//       status: history.status,
//       assignedAt: history.assignedAt,
//       completedAt: history.completedAt,
//       rejectionCount: history.rejectionCount,
//       rejectionReason: history.rejectionReason,
//       acceptedByTeamLeader: history.acceptedByTeamLeader,
//     }));

//     console.log("Raw taskHistories:", JSON.stringify(taskHistories, null, 2));
//     console.log(
//       "Fetched task history for team leader:",
//       decoded.id,
//       JSON.stringify(tasks, null, 2)
//     );
//     return NextResponse.json({ tasks }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching task history:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function PUT(req) {
//   await connectDB();
//   try {
//     const { taskHistoryId, action, rejectionReason } = await req.json();
//     if (!taskHistoryId || !["Accept", "Reject"].includes(action)) {
//       return NextResponse.json(
//         { error: "Invalid task history ID or action" },
//         { status: 400 }
//       );
//     }
//     if (action === "Reject" && !rejectionReason) {
//       return NextResponse.json(
//         { error: "Rejection reason is required" },
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

//     const staff = await Staff.findById(decoded.id).select("isTeamLeader");
//     if (!staff.isTeamLeader) {
//       return NextResponse.json(
//         { error: "Only team leaders can accept/reject tasks" },
//         { status: 403 }
//       );
//     }

//     const taskHistory = await TaskHistory.findOne({
//       _id: taskHistoryId,
//       assignedByTeamLeader: decoded.id,
//       status: "Completed",
//       acceptedByTeamLeader: false,
//     }).populate("taskId");

//     if (!taskHistory) {
//       return NextResponse.json(
//         {
//           error:
//             "Task history not found, not in Completed status, or already accepted",
//         },
//         { status: 404 }
//       );
//     }

//     let update = {};
//     if (action === "Accept") {
//       update = { status: "Completed", acceptedByTeamLeader: true };
//       // Notify admin
//       const notification = new Notification({
//         taskId: taskHistory.taskId._id,
//         userId: taskHistory.assignedBy,
//         userModel: taskHistory.assignedByModel,
//         text: `Task completed by teammate and accepted by team leader: ${taskHistory.taskId.title}`,
//         read: false,
//       });
//       await notification.save();
//       console.log(
//         "Admin notification created:",
//         JSON.stringify(notification, null, 2)
//       );
//     } else {
//       update = {
//         status: "Rejected",
//         rejectedAt: new Date(),
//         rejectionCount: taskHistory.rejectionCount + 1,
//         rejectionReason,
//       };
//       // Notify teammate
//       const notification = new Notification({
//         taskId: taskHistory.taskId._id,
//         userId: taskHistory.staffId,
//         userModel: "Staff",
//         text: `Task rejected by team leader: ${taskHistory.taskId.title}. Reason: ${rejectionReason}`,
//         read: false,
//       });
//       await notification.save();
//       console.log(
//         "Teammate notification created:",
//         JSON.stringify(notification, null, 2)
//       );
//     }

//     const updatedTaskHistory = await TaskHistory.findByIdAndUpdate(
//       taskHistoryId,
//       { $set: update },
//       { new: true }
//     );

//     await Task.findByIdAndUpdate(taskHistory.taskId._id, {
//       status: action === "Accept" ? "Completed" : "In Progress",
//     });

//     console.log(
//       `${action} task:`,
//       taskHistoryId,
//       JSON.stringify(update, null, 2)
//     );
//     return NextResponse.json(
//       { taskHistory: updatedTaskHistory },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error processing task:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import TaskHistory from "@/model/TaskHistory";
import Staff from "@/model/Staff";
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

    if (!decoded.id || decoded.role !== "staff") {
      console.log("Unauthorized access attempt:", decoded);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const staff = await Staff.findById(decoded.id).select("isTeamLeader");
    if (!staff) {
      console.log("Staff not found for ID:", decoded.id);
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }
    if (!staff.isTeamLeader) {
      console.log("User is not a team leader:", decoded.id);
      return NextResponse.json(
        { error: "Only team leaders can view task history" },
        { status: 403 }
      );
    }

    const taskHistories = await TaskHistory.find({
      assignedByTeamLeader: decoded.id,
      status: { $in: ["Completed", "In Progress"] }, // Include In Progress
      acceptedByTeamLeader: false,
      adminAcceptedAt: null,
    }).populate({
      path: "taskId",
      select: "title description",
    });

    if (taskHistories.length === 0) {
      console.log("No tasks found for team leader:", decoded.id);
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
      adminRejectionCount: history.adminRejectionCount,
      adminRejectionReason: history.adminRejectionReason,
    }));

    console.log("Raw taskHistories:", JSON.stringify(taskHistories, null, 2));
    console.log(
      "Fetched task history for team leader:",
      decoded.id,
      JSON.stringify(tasks, null, 2)
    );
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching task history:", error);
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

    if (!decoded.id || decoded.role !== "staff") {
      console.log("Unauthorized PUT attempt:", decoded);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const staff = await Staff.findById(decoded.id).select("isTeamLeader");
    if (!staff.isTeamLeader) {
      console.log("User is not a team leader for PUT:", decoded.id);
      return NextResponse.json(
        { error: "Only team leaders can accept/reject tasks" },
        { status: 403 }
      );
    }

    const taskHistory = await TaskHistory.findOne({
      _id: taskHistoryId,
      assignedByTeamLeader: decoded.id,
      status: { $in: ["Completed", "In Progress"] }, // Allow both statuses
      acceptedByTeamLeader: false,
      adminAcceptedAt: null,
    }).populate("taskId");

    if (!taskHistory) {
      console.log(
        "Task history not found or invalid for taskHistoryId:",
        taskHistoryId,
        "Conditions:",
        {
          assignedByTeamLeader: decoded.id,
          status: ["Completed", "In Progress"],
          acceptedByTeamLeader: false,
          adminAcceptedAt: null,
        }
      );
      return NextResponse.json(
        {
          error:
            "Task history not found, not in valid status, or already accepted",
        },
        { status: 404 }
      );
    }

    let update = {};
    if (action === "Accept") {
      update = { status: "Completed", acceptedByTeamLeader: true };
      // Notify admin if assigned by admin
      if (taskHistory.assignedByModel === "Admin") {
        const notification = new Notification({
          taskId: taskHistory.taskId._id,
          userId: taskHistory.assignedBy,
          userModel: "Staff",
          text: `Task completed by teammate and accepted by team leader: ${taskHistory.taskId.title}`,
          read: false,
        });
        await notification.save();
        console.log(
          "Admin notification created:",
          JSON.stringify(notification, null, 2)
        );
      }
    } else {
      update = {
        status: "Rejected",
        rejectedAt: new Date(),
        rejectionCount: taskHistory.rejectionCount + 1,
        rejectionReason,
      };
      // Notify teammate
      const notification = new Notification({
        taskId: taskHistory.taskId._id,
        userId: taskHistory.staffId,
        userModel: "Staff",
        text: `Task rejected by team leader: ${taskHistory.taskId.title}. Reason: ${rejectionReason}`,
        read: false,
      });
      await notification.save();
      console.log(
        "Teammate notification created:",
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
    console.error("Error processing task:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
