import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Staff from "@/model/Staff";
import jwt from "jsonwebtoken";

export async function GET(req) {
  await connectDB();

  // Check for token in Authorization header or cookie
  let token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) {
    token = req.cookies.get("token")?.value; // Assumes cookie named 'token'
  }

  if (!token) {
    console.error("No token provided in header or cookie");
    return NextResponse.json(
      { error: "Unauthorized: No token provided" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified. Payload:", decoded); // Debug log
    if (!decoded.id) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const staff = await Staff.findById(decoded.id).select(
      "name email role isTeamLeader"
    );
    if (!staff) {
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }

    console.log("Fetched staff profile:", staff); // Debug log
    return NextResponse.json({ staff });
  } catch (error) {
    console.error("Error verifying token or fetching profile:", error.message);
    return NextResponse.json(
      { error: "Unauthorized: Invalid token" },
      { status: 401 }
    );
  }
}
