// // app/api/admin/login/route.js
// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/db";
// import Admin from "@/model/Admin";

// export async function POST(req) {
//   await dbConnect();

//   const { email, password } = await req.json();

//   if (!email || !password) {
//     return NextResponse.json({ error: "All fields required" }, { status: 400 });
//   }

//   const admin = await Admin.findOne({ email });
//   if (!admin) {
//     return NextResponse.json(
//       { error: "Invalid email or password" },
//       { status: 401 }
//     );
//   }

//   const match = await bcrypt.compare(password, admin.password);
//   if (!match) {
//     return NextResponse.json(
//       { error: "Invalid email or password" },
//       { status: 401 }
//     );
//   }

//   return NextResponse.json({
//     message: "Password correct",
//     faceDescriptor: Array.from(admin.faceDescriptor),
//     id: admin._id,
//     email: admin.email,
//   });
// }

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/db";
// import Admin from "@/model/Admin";

// export async function POST(req) {
//   await dbConnect();

//   const { email, password } = await req.json();
//   if (!email || !password) {
//     return NextResponse.json({ error: "All fields required" }, { status: 400 });
//   }

//   const admin = await Admin.findOne({ email });
//   if (!admin) {
//     return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//   }

//   const validPass = await bcrypt.compare(password, admin.password);
//   if (!validPass) {
//     return NextResponse.json({ error: "Invalid password" }, { status: 401 });
//   }

//   return NextResponse.json({
//     message: "Password correct",
//     faceDescriptor: admin.faceDescriptor,
//     email: admin.email,
//     id: admin._id,
//   });
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import Admin from "@/model/Admin";
import { generateToken } from "@/lib/auth";

export async function POST(req) {
  await dbConnect();

  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  const validPass = await bcrypt.compare(password, admin.password);
  if (!validPass) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  // ✅ Prepare token on server (no face check here)
  const token = generateToken({ email: admin.email, id: admin._id });

  return NextResponse.json({
    message: "Password correct",
    faceDescriptor: admin.faceDescriptor,
    token, // ✅ send this to frontend
    email: admin.email,
    id: admin._id,
  });
}
