// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Task from "@/model/Task";
// import TaskHistory from "@/model/TaskHistory";
// import Staff from "@/model/Staff";
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

//     const staff = await Staff.findById(decoded.id);
//     if (!staff || staff.isTeamLeader) {
//       return NextResponse.json(
//         { error: "Only non-team leaders can fetch teammate tasks" },
//         { status: 403 }
//       );
//     }

//     const taskHistories = await TaskHistory.find({
//       staffId: decoded.id,
//       status: { $in: ["Assigned", "Started"] },
//       assignedByTeamLeader: { $ne: null }, // Tasks assigned by team leader
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
//       assignedAt: history.assignedToTeammateAt || history.assignedAt,
//       startedAt: history.startedAt,
//     }));

//     return NextResponse.json({ tasks }, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching teammate tasks:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
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
      status: { $in: ["Assigned", "Started", "Rejected"] },
      assignedByTeamLeader: { $exists: true },
    }).populate({
      path: "taskId",
      select: "title description",
    });

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
      "Fetched tasks for teammate:",
      decoded.id,
      JSON.stringify(tasks, null, 2)
    );
    return NextResponse.json({ tasks }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
