// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import dbConnect from "@/lib/db";
// import Leave from "@/model/Leave";

// const JWT_SECRET =
//   process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

// // Validate dates
// const validateDates = (fromDate, toDate) => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   const from = new Date(fromDate);
//   const to = new Date(toDate);

//   if (from < today) return "From date cannot be in the past";
//   if (to < today) return "To date cannot be in the past";
//   if (to < from) return "To date cannot be before from date";
//   return null;
// };

// // POST /api/staff/staffLeave/apply - Submit leave request
// export async function POST(req) {
//   await dbConnect();

//   try {
//     const token = req.cookies.get("token")?.value;
//     console.log("Token received:", token ? "Present" : "Missing");
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized: No token found" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     console.log("Decoded token:", decoded);
//     if (decoded.role !== "staff") {
//       return NextResponse.json(
//         { error: "Forbidden: Not a staff member" },
//         { status: 403 }
//       );
//     }

//     const { fromDate, toDate, description } = await req.json();
//     if (!fromDate || !toDate || !description) {
//       console.log("Missing required fields:", {
//         fromDate,
//         toDate,
//         description,
//       });
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const dateError = validateDates(fromDate, toDate);
//     if (dateError) {
//       console.log("Date validation error:", dateError);
//       return NextResponse.json({ error: dateError }, { status: 400 });
//     }

//     const leave = new Leave({
//       staff: decoded.id,
//       fromDate: new Date(fromDate),
//       toDate: new Date(toDate),
//       description,
//     });

//     await leave.save();
//     console.log("Leave request saved:", leave._id);
//     return NextResponse.json(
//       { message: "Leave request submitted", leave },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error submitting leave:", error.message);
//     return NextResponse.json(
//       { error: error.message || "Failed to submit leave request" },
//       { status: 500 }
//     );
//   }
// }

// // GET /api/staff/staffLeave/my-leaves - Get staff's leave requests
// export async function GET(req) {
//   await dbConnect();

//   try {
//     const token = req.cookies.get("token")?.value;
//     console.log("Token received:", token ? "Present" : "Missing");
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized: No token found" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     console.log("Decoded token:", decoded);
//     if (decoded.role !== "staff") {
//       return NextResponse.json(
//         { error: "Forbidden: Not a staff member" },
//         { status: 403 }
//       );
//     }

//     const leaves = await Leave.find({ staff: decoded.id })
//       .populate("staff", "name email role")
//       .sort({ createdAt: -1 });

//     console.log("Fetched leaves for user:", decoded.id, leaves.length);
//     return NextResponse.json(leaves, { status: 200 });
//   } catch (error) {
//     console.error("Error fetching leaves:", error.message);
//     return NextResponse.json(
//       { error: error.message || "Failed to fetch leaves" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/db";
import Leave from "@/model/Leave";
import Staff from "@/model/Staff";
import Admin from "@/model/Admin";

const JWT_SECRET =
  process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

// Validate dates
const validateDates = (fromDate, toDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const from = new Date(fromDate);
  const to = new Date(toDate);

  if (from < today) return "From date cannot be in the past";
  if (to < today) return "To date cannot be in the past";
  if (to < from) return "To date cannot be before from date";
  return null;
};

// GET /api/staff/staffLeave - Fetch leaves (all for admin, own for staff)
export async function GET(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;
    console.log("Token received:", token ? "Present" : "Missing");
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    let leaves;

    if (decoded.type === "admin" || decoded.role === "admin") {
      const admin = await Admin.findById(decoded.id);
      if (!admin || admin.isBlocked === "Y") {
        return NextResponse.json(
          { error: "Forbidden: Invalid or blocked admin" },
          { status: 403 }
        );
      }
      leaves = await Leave.find()
        .populate({
          path: "staff",
          select: "name email",
          model: Staff,
        })
        .sort({ createdAt: -1 });
    } else if (decoded.type === "staff" || decoded.role === "staff") {
      const staff = await Staff.findById(decoded.id);
      if (!staff || staff.isBlocked === "Y") {
        return NextResponse.json(
          { error: "Forbidden: Invalid or blocked staff" },
          { status: 403 }
        );
      }
      leaves = await Leave.find({ staff: decoded.id })
        .populate({
          path: "staff",
          select: "name email",
          model: Staff,
        })
        .sort({ createdAt: -1 });
    } else {
      return NextResponse.json(
        { error: "Forbidden: Invalid user type" },
        { status: 403 }
      );
    }

    console.log("Fetched leaves:", leaves.length);
    return NextResponse.json(leaves, { status: 200 });
  } catch (error) {
    console.error(
      "GET /api/staff/staffLeave error:",
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: error.message || "Failed to fetch leaves" },
      { status: 500 }
    );
  }
}

// POST /api/staff/staffLeave - Submit leave request (staff only)
export async function POST(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;
    console.log("Token received:", token ? "Present" : "Missing");
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (decoded.type !== "staff" && decoded.role !== "staff") {
      return NextResponse.json(
        { error: "Forbidden: Only staff can submit leaves" },
        { status: 403 }
      );
    }

    const staff = await Staff.findById(decoded.id);
    if (!staff || staff.isBlocked === "Y") {
      return NextResponse.json(
        { error: "Forbidden: Invalid or blocked staff" },
        { status: 403 }
      );
    }

    const { fromDate, toDate, description } = await req.json();
    if (!fromDate || !toDate || !description) {
      console.log("Missing required fields:", {
        fromDate,
        toDate,
        description,
      });
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const dateError = validateDates(fromDate, toDate);
    if (dateError) {
      console.log("Date validation error:", dateError);
      return NextResponse.json({ error: dateError }, { status: 400 });
    }

    const leave = new Leave({
      staff: decoded.id,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      description,
      status: "Pending",
    });

    await leave.save();
    const populatedLeave = await Leave.findById(leave._id).populate({
      path: "staff",
      select: "name email",
      model: Staff,
    });

    console.log("Leave request saved:", leave._id);
    return NextResponse.json(
      { message: "Leave request submitted", leave: populatedLeave },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "POST /api/staff/staffLeave error:",
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: error.message || "Failed to submit leave request" },
      { status: 500 }
    );
  }
}

// PUT /api/staff/staffLeave - Update leave status (admin only)
export async function PUT(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;
    console.log("Token received:", token ? "Present" : "Missing");
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (decoded.type !== "admin" && decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Forbidden: Not an admin" },
        { status: 403 }
      );
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.isBlocked === "Y") {
      return NextResponse.json(
        { error: "Forbidden: Invalid or blocked admin" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const leaveId = searchParams.get("id");
    const { status } = await req.json();

    if (!leaveId || !status) {
      return NextResponse.json(
        { error: "Leave ID and status are required" },
        { status: 400 }
      );
    }

    if (!["Accepted", "Rejected"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const leave = await Leave.findById(leaveId);
    if (!leave) {
      return NextResponse.json({ error: "Leave not found" }, { status: 404 });
    }

    if (leave.status !== "Pending") {
      return NextResponse.json(
        { error: "Leave already processed" },
        { status: 400 }
      );
    }

    leave.status = status;
    leave.updatedAt = new Date();
    await leave.save();

    const populatedLeave = await Leave.findById(leaveId).populate({
      path: "staff",
      select: "name email",
      model: Staff,
    });

    console.log("Leave status updated:", leave._id, status);
    return NextResponse.json({ leave: populatedLeave }, { status: 200 });
  } catch (error) {
    console.error(
      "PUT /api/staff/staffLeave error:",
      error.message,
      error.stack
    );
    return NextResponse.json(
      { error: error.message || "Failed to update leave" },
      { status: 500 }
    );
  }
}
