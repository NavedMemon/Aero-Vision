// import { NextResponse } from "next/server";

// export async function GET(req) {
//   try {
//     const token = req.cookies.get("token")?.value;
//     return NextResponse.json({ token: token || null });
//   } catch (error) {
//     console.error("Error fetching token:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id || !decoded.role) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    return NextResponse.json({ token, role: decoded.role });
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import Staff from "@/model/Staff";
// import Passenger from "@/model/Passenger";
// import Admin from "@/model/Admin";
// import connectDB from "@/lib/db";
// import mongoose from "mongoose";

// export async function GET(req) {
//   try {
//     await connectDB();
//     const token = req.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json({ error: "No token provided" }, { status: 401 });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded.id || !decoded.role) {
//       console.log("Invalid token structure:", decoded);
//       return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//     }

//     let userData = { userId: decoded.id, role: decoded.role };

//     if (decoded.role === "staff") {
//       const staff = await Staff.findById(decoded.id).select(
//         "department isBlocked"
//       );
//       if (staff) {
//         userData.department = staff.department;
//         userData.isBlocked = staff.isBlocked;
//       }
//     } else if (decoded.role === "passenger") {
//       const passenger = await Passenger.findById(decoded.id).select(
//         "flight isBlocked targetSentence"
//       );
//       if (passenger) {
//         userData.flight = passenger.flight;
//         userData.isBlocked = passenger.isBlocked;
//         userData.targetSentence = passenger.targetSentence;
//       }
//     } else if (decoded.role === "admin") {
//       const admin = await Admin.findById(decoded.id).select(
//         "isBlocked faceDescriptor"
//       );
//       if (admin) {
//         userData.isBlocked = admin.isBlocked;
//         userData.faceDescriptor = admin.faceDescriptor;
//       }
//     }

//     console.log("Token verified:", userData);
//     return NextResponse.json(userData);
//   } catch (error) {
//     console.error("Error fetching token:", error.message);
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }
// }
