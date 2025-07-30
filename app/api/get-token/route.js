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
