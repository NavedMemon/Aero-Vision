// app/api/admin/users/history/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import LoginHistory from "@/model/LoginLogoutHistory";

export async function GET(req) {
  await connectDB();
  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("userId");
  if (!userId)
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  const history = await LoginHistory.find({ userId })
    .sort({ timestamp: -1 })
    .limit(50);
  return NextResponse.json({ history });
}
