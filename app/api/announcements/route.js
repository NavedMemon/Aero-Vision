// app/api/announcement/route.js
import connectDB from "@/lib/db";

export async function GET(request) {
  await connectDB();

  return Response.json({ message: "✅ MongoDB connection test successful!" });
}
