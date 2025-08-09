// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Staff from "@/model/Staff";

// export async function GET() {
//   await connectDB();
//   const staff = await Staff.find();
//   return NextResponse.json(staff);
// }

// export async function POST(req) {
//   await connectDB();
//   const { name, gender, age, role, email, password } = await req.json();

//   const exists = await Staff.findOne({ email });
//   if (exists) {
//     return NextResponse.json(
//       { error: "Email already exists" },
//       { status: 400 }
//     );
//   }

//   const newStaff = new Staff({ name, gender, age, role, email, password });
//   await newStaff.save();
//   return NextResponse.json({ message: "Staff created successfully" });
// }

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Staff from "@/model/Staff";
// import bcrypt from "bcryptjs";

// export async function GET(req) {
//   await connectDB();
//   const {
//     search,
//     filterRole,
//     page = "1",
//     perPage = "7",
//   } = Object.fromEntries(req.nextUrl.searchParams);
//   const q = {};
//   if (search)
//     q.$or = [
//       { name: new RegExp(search, "i") },
//       { email: new RegExp(search, "i") },
//     ];
//   if (filterRole) q.role = filterRole;
//   const pageNum = parseInt(page),
//     pp = parseInt(perPage);
//   const total = await Staff.countDocuments(q);
//   const staff = await Staff.find(q)
//     .skip((pageNum - 1) * pp)
//     .limit(pp)
//     .select("-password");
//   return NextResponse.json({ staff, total, page: pageNum, perPage: pp });
// }

// export async function POST(req) {
//   await connectDB();

//   const { name, gender, age, role, email, password } = await req.json();

//   if (!name || !gender || !age || !role || !email || !password) {
//     return NextResponse.json(
//       { error: "All fields required." },
//       { status: 400 }
//     );
//   }

//   const existing = await Staff.findOne({ email });
//   if (existing) {
//     return NextResponse.json(
//       { error: "Email already exists." },
//       { status: 400 }
//     );
//   }

//   const staff = new Staff({
//     name,
//     gender,
//     age,
//     role,
//     email,
//     password, // plain, will be hashed in pre('save')
//   });

//   await staff.save();

//   return NextResponse.json({
//     success: true,
//     staff: { ...staff.toObject(), password: undefined },
//   });
// }

// export async function PATCH(req) {
//   await connectDB();
//   const { _id, name, gender, age, role, email, password } = await req.json();
//   if (!_id || !name || !gender || !age || !role || !email) {
//     return NextResponse.json({ error: "Missing fields." }, { status: 400 });
//   }
//   const updates = { name, gender, age, role, email };
//   if (password) updates.password = await bcrypt.hash(password, 10);
//   const updated = await Staff.findByIdAndUpdate(_id, updates, { new: true });
//   return NextResponse.json({
//     success: true,
//     updated: { ...updated.toObject(), password: undefined },
//   });
// }

// export async function DELETE(req) {
//   await connectDB();
//   const { id } = await req.json();
//   if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 });
//   await Staff.findByIdAndDelete(id);
//   return NextResponse.json({ success: true });
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Staff from "@/model/Staff";
import Notification from "@/model/Notification";
import bcrypt from "bcryptjs";

export async function GET(req) {
  await connectDB();
  const {
    search,
    filterRole,
    page = "1",
    perPage = "7",
  } = Object.fromEntries(req.nextUrl.searchParams);
  const q = {};
  if (search)
    q.$or = [
      { name: new RegExp(search, "i") },
      { email: new RegExp(search, "i") },
    ];
  if (filterRole) q.role = filterRole;
  const pageNum = parseInt(page),
    pp = parseInt(perPage);
  const total = await Staff.countDocuments(q);
  const staff = await Staff.find(q)
    .skip((pageNum - 1) * pp)
    .limit(pp)
    .select("-password");
  console.log("GET staff response:", { staff, total });
  return NextResponse.json({ staff, total, page: pageNum, perPage: pp });
}

export async function POST(req) {
  await connectDB();
  const { name, gender, age, role, email, password, isTeamLeader } =
    await req.json();

  if (!name || !gender || !age || !role || !email || !password) {
    return NextResponse.json(
      { error: "All fields required." },
      { status: 400 }
    );
  }

  const existing = await Staff.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: "Email already exists." },
      { status: 400 }
    );
  }

  const staff = new Staff({
    name,
    gender,
    age,
    role,
    email,
    password, // Will be hashed in pre('save')
    isTeamLeader: !!isTeamLeader,
  });

  try {
    await staff.save();
    // Create notification for team leader assignment
    if (staff.isTeamLeader) {
      await Notification.create({
        userId: staff._id,
        userModel: "Staff",
        text: `You have been assigned as the team leader for ${staff.role}.`,
        read: false,
      });
      console.log("Notification created for team leader:", {
        userId: staff._id,
        role: staff.role,
      });
    }
    console.log("Created staff:", { ...staff.toObject(), password: undefined });
    return NextResponse.json({
      success: true,
      staff: { ...staff.toObject(), password: undefined },
    });
  } catch (error) {
    console.error("Error creating staff:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function PATCH(req) {
  await connectDB();
  const { _id, name, gender, age, role, email, password, isTeamLeader } =
    await req.json();
  if (!_id || !name || !gender || !age || !role || !email) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  // Check previous state for notification
  const prevStaff = await Staff.findById(_id);
  const updates = {
    name,
    gender,
    age,
    role,
    email,
    isTeamLeader: !!isTeamLeader,
  };
  if (password) updates.password = await bcrypt.hash(password, 10);

  try {
    const updated = await Staff.findByIdAndUpdate(_id, updates, { new: true });
    if (!updated) {
      return NextResponse.json({ error: "Staff not found." }, { status: 404 });
    }

    // Create notifications for team leader changes
    if (isTeamLeader && !prevStaff.isTeamLeader) {
      await Notification.create({
        userId: updated._id,
        userModel: "Staff",
        text: `You have been assigned as the team leader for ${updated.role}.`,
        read: false,
      });
      console.log("Notification created for team leader assignment:", {
        userId: updated._id,
        role: updated.role,
      });
    } else if (!isTeamLeader && prevStaff.isTeamLeader) {
      await Notification.create({
        userId: updated._id,
        userModel: "Staff",
        text: `You have been removed as the team leader for ${updated.role}.`,
        read: false,
      });
      console.log("Notification created for team leader removal:", {
        userId: updated._id,
        role: updated.role,
      });
    }

    console.log("Updated staff:", {
      ...updated.toObject(),
      password: undefined,
    });
    return NextResponse.json({
      success: true,
      updated: { ...updated.toObject(), password: undefined },
    });
  } catch (error) {
    console.error("Error updating staff:", error.message);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req) {
  await connectDB();
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "ID required." }, { status: 400 });
  await Staff.findByIdAndDelete(id);
  console.log("Deleted staff with ID:", id);
  return NextResponse.json({ success: true });
}
