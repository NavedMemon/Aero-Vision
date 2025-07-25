import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import LoginHistory from "@/model/LoginLogoutHistory";
import connectDB from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req) {
  try {
    await connectDB();

    const cookieHeader = req.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(/token=([^;]+)/);
    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return NextResponse.json({ error: "No token found." }, { status: 401 });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return NextResponse.json({ error: "Invalid token." }, { status: 403 });
    }

    // ✅ Fix: Use decoded.id instead of decoded._id
    await LoginHistory.create({
      userId: decoded.id,
      role: decoded.role,
      action: "logout",
      timestamp: new Date(),
    });

    return NextResponse.json(
      { success: true, message: "Logout successful." },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict; Secure`,
        },
      }
    );
  } catch (err) {
    console.error("Logout Error:", err);
    return NextResponse.json({ error: "Logout failed." }, { status: 500 });
  }
}
