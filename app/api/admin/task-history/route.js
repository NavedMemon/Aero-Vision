// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import TaskHistory from "@/model/TaskHistory";
// import Staff from "@/model/Staff";
// import Admin from "@/model/Admin";
// import Task from "@/model/Task";
// import connectDB from "@/lib/db";

// export async function GET(request) {
//   await connectDB();
//   const token = request.cookies.get("token")?.value;
//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const { searchParams } = new URL(request.url);
//     const description = searchParams.get("description") || "";
//     const name = searchParams.get("name") || "";
//     const email = searchParams.get("email") || "";
//     const startDate = searchParams.get("startDate") || "";
//     const endDate = searchParams.get("endDate") || "";
//     const status = searchParams.get("status") || "";

//     const query = {};
//     if (description) {
//       query.description = { $regex: description, $options: "i" };
//     }
//     if (status) {
//       query.status = status;
//     }
//     if (startDate || endDate) {
//       query.assignedAt = {};
//       if (startDate) query.assignedAt.$gte = new Date(startDate);
//       if (endDate) query.assignedAt.$lte = new Date(endDate);
//     }

//     let staffIds = [];
//     if (name || email) {
//       const staffQuery = {};
//       if (name) staffQuery.name = { $regex: name, $options: "i" };
//       if (email) staffQuery.email = { $regex: email, $options: "i" };
//       const staff = await Staff.find(staffQuery).select("_id name email");
//       staffIds = staff.map((s) => s._id);
//       query.staffId = { $in: staffIds.length ? staffIds : [] };
//     }

//     const taskHistories = await TaskHistory.find(query)
//       .populate({
//         path: "staffId",
//         select: "name email",
//         model: Staff,
//       })
//       .populate({
//         path: "assignedByTeamLeader",
//         select: "name",
//         model: Staff,
//       })
//       .populate({
//         path: "taskId",
//         select: "title department",
//         model: Task,
//       })
//       .lean();

//     // Manually populate assignedBy based on assignedByModel
//     const formattedTasks = await Promise.all(
//       taskHistories.map(async (task) => {
//         let adminEmail = "Unknown";
//         if (task.assignedBy && task.assignedByModel) {
//           if (task.assignedByModel === "Admin") {
//             const admin = await Admin.findById(task.assignedBy)
//               .select("email")
//               .lean();
//             adminEmail = admin?.email || "Unknown";
//           } else if (task.assignedByModel === "Staff") {
//             const staff = await Staff.findById(task.assignedBy)
//               .select("email")
//               .lean();
//             adminEmail = staff?.email || "Unknown";
//           }
//         }

//         return {
//           _id: task._id.toString(),
//           taskId: task.taskId?._id.toString(),
//           title: task.taskId?.title || "Unknown",
//           department: task.taskId?.department || "Unknown",
//           description: task.description,
//           staffId: task.staffId?._id.toString(),
//           staffName: task.staffId?.name || "Unknown",
//           staffEmail: task.staffId?.email || "Unknown",
//           teamLeaderName: task.assignedByTeamLeader?.name || "Unknown",
//           adminEmail,
//           status: task.status,
//           assignedAt: task.assignedAt,
//           startedAt: task.startedAt || null,
//           completedAt: task.completedAt || null,
//           rejectedAt: task.rejectedAt || null,
//           adminAcceptedAt: task.adminAcceptedAt || null,
//           adminRejectedAt: task.adminRejectedAt || null,
//           rejectionCount: task.rejectionCount || 0,
//           adminRejectionCount: task.adminRejectionCount || 0,
//           rejectionReason: task.rejectionReason || "",
//           adminRejectionReason: task.adminRejectionReason || "",
//           acceptedByTeamLeader: task.acceptedByTeamLeader || false,
//         };
//       })
//     );

//     return NextResponse.json({ taskHistories: formattedTasks });
//   } catch (err) {
//     console.error("Error fetching task history:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function PUT(request) {
//   await connectDB();
//   const token = request.cookies.get("token")?.value;
//   if (!token) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const { taskId, description, staffId, status } = await request.json();
//     if (!taskId || !description || !staffId) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     const taskHistory = await TaskHistory.findById(taskId);
//     if (!taskHistory) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     const updateData = { description, staffId, status };
//     if (status === "Started" && !taskHistory.startedAt) {
//       updateData.startedAt = new Date();
//     } else if (status === "Completed" && !taskHistory.completedAt) {
//       updateData.completedAt = new Date();
//     }

//     const updatedTask = await TaskHistory.findByIdAndUpdate(
//       taskId,
//       updateData,
//       {
//         new: true,
//       }
//     );
//     if (!updatedTask) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json({ message: "Task updated" });
//   } catch (err) {
//     console.error("Error updating task:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import TaskHistory from "@/model/TaskHistory";
import Staff from "@/model/Staff";
import Admin from "@/model/Admin";
import Task from "@/model/Task";
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
      .populate({
        path: "staffId",
        select: "name email",
        model: Staff,
      })
      .populate({
        path: "assignedByTeamLeader",
        select: "name",
        model: Staff,
      })
      .populate({
        path: "taskId",
        select: "title department",
        model: Task,
      })
      .lean();

    // Manually populate assignedBy based on assignedByModel
    const formattedTasks = await Promise.all(
      taskHistories.map(async (task) => {
        let adminEmail = "Unknown";
        if (task.assignedBy && task.assignedByModel) {
          try {
            if (task.assignedByModel === "Admin") {
              const admin = await Admin.findById(task.assignedBy)
                .select("email")
                .lean();
              adminEmail = admin?.email || "Unknown";
            } else if (task.assignedByModel === "Staff") {
              const staff = await Staff.findById(task.assignedBy)
                .select("email")
                .lean();
              adminEmail = staff?.email || "Unknown";
            }
          } catch (err) {
            console.error(
              `Error populating assignedBy for task ${task._id}:`,
              err
            );
          }
        }

        // Debug assignedByTeamLeader
        if (!task.assignedByTeamLeader) {
          console.warn(`No assignedByTeamLeader for task ${task._id}`);
        } else if (!task.assignedByTeamLeader.name) {
          console.warn(
            `assignedByTeamLeader ${task.assignedByTeamLeader._id} has no name for task ${task._id}`
          );
        }

        return {
          _id: task._id.toString(),
          taskId: task.taskId?._id.toString(),
          title: task.taskId?.title || "Unknown",
          department: task.taskId?.department || "Unknown",
          description: task.description,
          staffId: task.staffId?._id.toString(),
          staffName: task.staffId?.name || "Unknown",
          staffEmail: task.staffId?.email || "Unknown",
          teamLeaderName: task.assignedByTeamLeader?.name || "Unknown",
          adminEmail,
          status: task.status,
          assignedAt: task.assignedAt,
          startedAt: task.startedAt || null,
          completedAt: task.completedAt || null,
          rejectedAt: task.rejectedAt || null,
          adminAcceptedAt: task.adminAcceptedAt || null,
          adminRejectedAt: task.adminRejectedAt || null,
          rejectionCount: task.rejectionCount || 0,
          adminRejectionCount: task.adminRejectionCount || 0,
          rejectionReason: task.rejectionReason || "",
          adminRejectionReason: task.adminRejectionReason || "",
          acceptedByTeamLeader: task.acceptedByTeamLeader || false,
        };
      })
    );

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

    const taskHistory = await TaskHistory.findById(taskId);
    if (!taskHistory) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const updateData = { description, staffId, status };
    if (status === "Started" && !taskHistory.startedAt) {
      updateData.startedAt = new Date();
    } else if (status === "Completed" && !taskHistory.completedAt) {
      updateData.completedAt = new Date();
    }

    const updatedTask = await TaskHistory.findByIdAndUpdate(
      taskId,
      updateData,
      {
        new: true,
      }
    );
    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task updated" });
  } catch (err) {
    console.error("Error updating task:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
