// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Staff from "@/model/Staff";
// import jwt from "jsonwebtoken";

// export async function GET(req) {
//   await connectDB();

//   // Check for token in Authorization header or cookie
//   let token = req.headers.get("authorization")?.split(" ")[1];
//   if (!token) {
//     token = req.cookies.get("token")?.value; // Assumes cookie named 'token'
//   }

//   if (!token) {
//     console.error("No token provided in header or cookie");
//     return NextResponse.json(
//       { error: "Unauthorized: No token provided" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Token verified. Payload:", decoded); // Debug log
//     if (!decoded.id) {
//       return NextResponse.json(
//         { error: "Unauthorized: Invalid token" },
//         { status: 401 }
//       );
//     }

//     const currentStaff = await Staff.findById(decoded.id).select(
//       "role isTeamLeader"
//     );
//     if (!currentStaff) {
//       return NextResponse.json({ error: "Staff not found" }, { status: 404 });
//     }
//     if (!currentStaff.isTeamLeader) {
//       return NextResponse.json(
//         { error: "Only team leaders can view teammates" },
//         { status: 403 }
//       );
//     }

//     const teammates = await Staff.find({
//       role: currentStaff.role,
//       _id: { $ne: currentStaff._id }, // Exclude the team leader
//       isBlocked: "N", // Exclude blocked staff
//     }).select("name email age gender role");

//     console.log("Fetched teammates for role:", currentStaff.role, teammates); // Debug log
//     return NextResponse.json({ teammates });
//   } catch (error) {
//     console.error(
//       "Error verifying token or fetching teammates:",
//       error.message
//     );
//     return NextResponse.json(
//       { error: "Unauthorized: Invalid token" },
//       { status: 401 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Staff from "@/model/Staff";
import Task from "@/model/Task";
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

    const teamLeader = await Staff.findById(decoded.id);
    if (!teamLeader || !teamLeader.isTeamLeader) {
      return NextResponse.json(
        { error: "Only team leaders can fetch teammates" },
        { status: 403 }
      );
    }

    const url = new URL(req.url);
    const taskId = url.searchParams.get("taskId");

    let department;
    if (taskId) {
      const task = await Task.findById(taskId).select("department");
      if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }
      department = task.department;
    } else {
      department = teamLeader.role; // Fallback to team leader's role
    }

    const teammates = await Staff.find({
      role: department,
      isTeamLeader: false,
      isBlocked: "N",
    }).select("name email");

    console.log(
      "Fetched teammates for department:",
      department,
      teammates.map((t) => t.email)
    );

    return NextResponse.json({ teammates }, { status: 200 });
  } catch (error) {
    console.error("Error fetching teammates:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
