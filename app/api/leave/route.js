// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import dbConnect from "@/lib/db";
// import Leave from "@/model/Leave";
// import Staff from "@/model/Staff";

// const JWT_SECRET =
//   process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

// export async function GET(req) {
//   await dbConnect();

//   try {
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized: No token found" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     let leaves;

//     if (decoded.role === "admin") {
//       leaves = await Leave.find()
//         .populate({
//           path: "staff",
//           select: "name email role",
//           model: Staff,
//         })
//         .sort({ createdAt: -1 });
//     } else if (decoded.role === "staff") {
//       leaves = await Leave.find({ staff: decoded.id })
//         .populate({
//           path: "staff",
//           select: "name email role",
//           model: Staff,
//         })
//         .sort({ createdAt: -1 });
//     } else {
//       return NextResponse.json(
//         { error: "Forbidden: Invalid role" },
//         { status: 403 }
//       );
//     }

//     return NextResponse.json(leaves, { status: 200 });
//   } catch (error) {
//     console.error("GET /api/leave error:", error.message, error.stack);
//     return NextResponse.json(
//       { error: error.message || "Failed to fetch leaves" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req) {
//   await dbConnect();

//   try {
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized: No token found" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (decoded.role !== "staff") {
//       return NextResponse.json(
//         { error: "Forbidden: Only staff can submit leaves" },
//         { status: 403 }
//       );
//     }

//     const { fromDate, toDate, description } = await req.json();
//     if (!fromDate || !toDate || !description) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     const leave = new Leave({
//       staff: decoded.id,
//       fromDate: new Date(fromDate),
//       toDate: new Date(toDate),
//       description,
//       status: "Pending",
//     });

//     await leave.save();
//     const populatedLeave = await Leave.findById(leave._id).populate({
//       path: "staff",
//       select: "name email role",
//       model: Staff,
//     });

//     return NextResponse.json(
//       { message: "Leave request submitted", leave: populatedLeave },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("POST /api/leave error:", error.message, error.stack);
//     return NextResponse.json(
//       { error: error.message || "Failed to create leave" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req) {
//   await dbConnect();

//   try {
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized: No token found" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json(
//         { error: "Forbidden: Not an admin" },
//         { status: 403 }
//       );
//     }

//     const { searchParams } = new URL(req.url);
//     const leaveId = searchParams.get("id");
//     const { status } = await req.json();

//     if (!leaveId || !status) {
//       return NextResponse.json(
//         { error: "Leave ID and status are required" },
//         { status: 400 }
//       );
//     }

//     if (!["Accepted", "Rejected"].includes(status)) {
//       return NextResponse.json({ error: "Invalid status" }, { status: 400 });
//     }

//     const leave = await Leave.findById(leaveId);
//     if (!leave) {
//       return NextResponse.json({ error: "Leave not found" }, { status: 404 });
//     }

//     if (leave.status !== "Pending") {
//       return NextResponse.json(
//         { error: "Leave already processed" },
//         { status: 400 }
//       );
//     }

//     leave.status = status;
//     await leave.save();

//     const populatedLeave = await Leave.findById(leaveId).populate({
//       path: "staff",
//       select: "name email role",
//       model: Staff,
//     });

//     return NextResponse.json({ leave: populatedLeave }, { status: 200 });
//   } catch (error) {
//     console.error("PUT /api/leave error:", error.message, error.stack);
//     return NextResponse.json(
//       { error: error.message || "Failed to update leave" },
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

export async function GET(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    let leaves;

    if (decoded.type === "admin") {
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
    } else if (decoded.type === "staff") {
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

    return NextResponse.json(leaves, { status: 200 });
  } catch (error) {
    console.error("GET /api/leave error:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Failed to fetch leaves" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type !== "staff") {
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
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
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

    return NextResponse.json(
      { message: "Leave request submitted", leave: populatedLeave },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/leave error:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Failed to create leave" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  await dbConnect();

  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type !== "admin") {
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

    return NextResponse.json({ leave: populatedLeave }, { status: 200 });
  } catch (error) {
    console.error("PUT /api/leave error:", error.message, error.stack);
    return NextResponse.json(
      { error: error.message || "Failed to update leave" },
      { status: 500 }
    );
  }
}
