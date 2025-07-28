// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import connectDB from "@/lib/db"; // Default import
// import Gate from "@/model/Gate";
// import Admin from "@/model/Admin";

// export async function GET(req) {
//   await connectDB();
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { error: "Unauthorized: No token provided" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const gates = await Gate.find()
//       .populate("createdBy", "email")
//       .sort({ createdAt: -1 });
//     return NextResponse.json({ gates }, { status: 200 });
//   } catch (error) {
//     console.error("GET - Error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req) {
//   await connectDB();
//   const { gateNumber } = await req.json();
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { error: "Unauthorized: No token provided" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       console.log("POST - Admin not found for id:", decoded.id); // Debug log
//       return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//     }

//     if (
//       !gateNumber ||
//       typeof gateNumber !== "string" ||
//       gateNumber.trim() === ""
//     ) {
//       return NextResponse.json(
//         { error: "Gate number is required" },
//         { status: 400 }
//       );
//     }

//     const existingGate = await Gate.findOne({ gateNumber });
//     if (existingGate) {
//       return NextResponse.json(
//         { error: "Gate number already exists" },
//         { status: 400 }
//       );
//     }

//     const gate = new Gate({
//       gateNumber: gateNumber.trim(),
//       createdBy: admin._id,
//     });
//     await gate.save();

//     return NextResponse.json({ success: true, gate }, { status: 201 });
//   } catch (error) {
//     if (error.name === "JsonWebTokenError") {
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }
//     console.error("POST - Error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function PUT(req) {
//   await connectDB();
//   const { gateId, gateNumber } = await req.json();
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { error: "Unauthorized: No token provided" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       console.log("PUT - Admin not found for id:", decoded.id); // Debug log
//       return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//     }

//     if (
//       !gateId ||
//       !gateNumber ||
//       typeof gateNumber !== "string" ||
//       gateNumber.trim() === ""
//     ) {
//       return NextResponse.json(
//         { error: "Gate ID and number are required" },
//         { status: 400 }
//       );
//     }

//     const existingGate = await Gate.findOne({
//       gateNumber,
//       _id: { $ne: gateId },
//     });
//     if (existingGate) {
//       return NextResponse.json(
//         { error: "Gate number already exists" },
//         { status: 400 }
//       );
//     }

//     const gate = await Gate.findByIdAndUpdate(
//       gateId,
//       { gateNumber: gateNumber.trim() },
//       { new: true }
//     );
//     if (!gate) {
//       return NextResponse.json({ error: "Gate not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true, gate }, { status: 200 });
//   } catch (error) {
//     console.error("PUT - Error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function DELETE(req) {
//   await connectDB();
//   const { gateId } = await req.json();
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json(
//       { error: "Unauthorized: No token provided" },
//       { status: 401 }
//     );
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const admin = await Admin.findById(decoded.id);
//     if (!admin) {
//       console.log("DELETE - Admin not found for id:", decoded.id); // Debug log
//       return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//     }

//     if (!gateId) {
//       return NextResponse.json(
//         { error: "Gate ID is required" },
//         { status: 400 }
//       );
//     }

//     const gate = await Gate.findByIdAndDelete(gateId);
//     if (!gate) {
//       return NextResponse.json({ error: "Gate not found" }, { status: 404 });
//     }

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("DELETE - Error:", error.message);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Gate from "@/model/Gate";
import Admin from "@/model/Admin";

export async function GET(req) {
  await connectDB();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.log("GET - Admin not found for id:", decoded.id);
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    const gates = await Gate.find()
      .populate("createdBy", "email")
      .sort({ createdAt: -1 });
    return NextResponse.json({ success: true, gates }, { status: 200 });
  } catch (error) {
    console.error("GET - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req) {
  await connectDB();
  const { gateNumber } = await req.json();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.log("POST - Admin not found for id:", decoded.id);
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (
      !gateNumber ||
      typeof gateNumber !== "string" ||
      gateNumber.trim() === ""
    ) {
      return NextResponse.json(
        { error: "Gate number is required" },
        { status: 400 }
      );
    }

    const existingGate = await Gate.findOne({ gateNumber });
    if (existingGate) {
      return NextResponse.json(
        { error: "Gate number already exists" },
        { status: 400 }
      );
    }

    const gate = new Gate({
      gateNumber: gateNumber.trim(),
      createdBy: admin._id,
    });
    await gate.save();

    return NextResponse.json({ success: true, gate }, { status: 201 });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    console.error("POST - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  await connectDB();
  const { gateId, gateNumber } = await req.json();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.log("PUT - Admin not found for id:", decoded.id);
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (
      !gateId ||
      !gateNumber ||
      typeof gateNumber !== "string" ||
      gateNumber.trim() === ""
    ) {
      return NextResponse.json(
        { error: "Gate ID and number are required" },
        { status: 400 }
      );
    }

    const existingGate = await Gate.findOne({
      gateNumber,
      _id: { $ne: gateId },
    });
    if (existingGate) {
      return NextResponse.json(
        { error: "Gate number already exists" },
        { status: 400 }
      );
    }

    const gate = await Gate.findByIdAndUpdate(
      gateId,
      { gateNumber: gateNumber.trim() },
      { new: true }
    );
    if (!gate) {
      return NextResponse.json({ error: "Gate not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, gate }, { status: 200 });
  } catch (error) {
    console.error("PUT - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const { gateId } = await req.json();
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      console.log("DELETE - Admin not found for id:", decoded.id);
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    if (!gateId) {
      return NextResponse.json(
        { error: "Gate ID is required" },
        { status: 400 }
      );
    }

    const gate = await Gate.findByIdAndDelete(gateId);
    if (!gate) {
      return NextResponse.json({ error: "Gate not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE - Error:", error.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
