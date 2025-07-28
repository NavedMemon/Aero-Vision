// // app/api/admin/users/route.js
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Admin from "@/model/Admin";
// import Passenger from "@/model/Passenger";
// import Staff from "@/model/Staff";

// export async function GET() {
//   try {
//     await connectDB();

//     const admins = await Admin.find().select("-password");
//     const passengers = await Passenger.find().select("-password");
//     const staff = await Staff.find().select("-password");

//     const users = [
//       ...admins.map((user) => ({
//         ...user._doc,
//         role: "Admin",
//       })),
//       ...passengers.map((user) => ({
//         ...user._doc,
//         role: "Passenger",
//       })),
//       ...staff.map((user) => ({
//         ...user._doc,
//         role: "Staff",
//       })),
//     ];

//     return NextResponse.json({ users }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error fetching users:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch users." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Admin from "@/model/Admin";
import Passenger from "@/model/Passenger";
import Staff from "@/model/Staff";
import LoginHistory from "@/model/LoginLogoutHistory";

export async function GET() {
  await connectDB();
  const [admins, passengers, staffs] = await Promise.all([
    Admin.find().select("-password"),
    Passenger.find().select("-password"),
    Staff.find().select("-password"),
  ]);
  const users = [
    ...admins.map((u) => ({ ...u.toObject(), role: "admin" })),
    ...passengers.map((u) => ({ ...u.toObject(), role: "passenger" })),
    ...staffs.map((u) => ({ ...u.toObject(), role: "staff" })),
  ];
  return NextResponse.json({ users });
}

export async function POST(req) {
  await connectDB();
  const { userId, role, block } = await req.json();
  if (!["passenger", "staff"].includes(role) || !userId)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  const Model = role === "passenger" ? Passenger : Staff;
  await Model.findByIdAndUpdate(userId, { isBlocked: block ? "Y" : "N" });
  return NextResponse.json({ success: true, blocked: block ? "Y" : "N" });
}
