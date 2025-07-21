// // app/api/passenger/validuser/route.js

// import { NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import connectDB from "@/lib/db";
// import Passenger from "@/model/Passenger";

// export async function GET(req) {
//   try {
//     await connectDB();

//     const token = req.headers.get("authorization")?.replace("Bearer ", "");
//     if (!token) {
//       return NextResponse.json(
//         { error: "No token provided." },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const passenger = await Passenger.findById(decoded.id).select("-password");

//     if (!passenger) {
//       return NextResponse.json(
//         { error: "Passenger not found." },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json({ passenger });
//   } catch (err) {
//     return NextResponse.json(
//       { error: "Invalid or expired token." },
//       { status: 401 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Passenger from "@/model/Passenger";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated. No token found." },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const passenger = await Passenger.findById(decoded.id).select("-password");

    if (!passenger) {
      return NextResponse.json(
        { error: "Passenger not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ passenger });
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid or expired token." },
      { status: 401 }
    );
  }
}
