// // import { NextResponse } from "next/server";
// // import bcrypt from "bcryptjs";
// // import dbConnect from "@/lib/db";
// // import Admin from "@/model/Admin";

// // export async function POST(req) {
// //   await dbConnect();

// //   const { email, password, faceDescriptor } = await req.json();

// //   if (!email || !password || !faceDescriptor) {
// //     return NextResponse.json(
// //       { error: "All fields are required" },
// //       { status: 400 }
// //     );
// //   }

// //   const existing = await Admin.findOne({ email });
// //   if (existing) {
// //     return NextResponse.json(
// //       { error: "Admin already exists" },
// //       { status: 409 }
// //     );
// //   }

// //   const hashedPassword = await bcrypt.hash(password, 10);

// //   const newAdmin = new Admin({
// //     email,
// //     password: hashedPassword,
// //     faceDescriptor: Buffer.from(faceDescriptor), // encoded Float32Array
// //   });

// //   await newAdmin.save();

// //   return NextResponse.json(
// //     { message: "Admin registered successfully" },
// //     { status: 201 }
// //   );
// // }

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import dbConnect from "@/lib/db";
// import Admin from "@/model/Admin";

// export async function POST(req) {
//   await dbConnect();

//   const { email, password, faceDescriptor } = await req.json();

//   if (!email || !password || !faceDescriptor) {
//     return NextResponse.json(
//       { error: "All fields are required" },
//       { status: 400 }
//     );
//   }

//   const existing = await Admin.findOne({ email });
//   if (existing) {
//     return NextResponse.json(
//       { error: "Admin already exists" },
//       { status: 409 }
//     );
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newAdmin = new Admin({
//     email,
//     password: hashedPassword,
//     faceDescriptor: Buffer.from(faceDescriptor),
//   });

//   await newAdmin.save();

//   return NextResponse.json(
//     { message: "Admin registered successfully" },
//     { status: 201 }
//   );
// }

// app/api/admin/register/route.js

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db";
import Admin from "@/model/Admin";

export async function POST(req) {
  await dbConnect();

  const { email, password, faceDescriptor } = await req.json();

  if (!email || !password || !faceDescriptor) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const existing = await Admin.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: "Admin already exists" },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = new Admin({
    email,
    password: hashedPassword,
    faceDescriptor,
  });

  await newAdmin.save();

  return NextResponse.json({ success: true, message: "Admin registered" });
}
