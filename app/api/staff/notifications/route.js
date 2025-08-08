// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Notification from "@/model/Notification";

// export async function GET(request) {
//   try {
//     await connectDB();
//     const { userId, role } = await (
//       await fetch(new URL("/api/get-token", request.url))
//     ).json();
//     if (role !== "Staff") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }
//     const notifications = await Notification.find({
//       userId,
//       userModel: "Staff",
//     }).sort({ createdAt: -1 });
//     return NextResponse.json({ notifications });
//   } catch (error) {
//     console.error("Error fetching staff notifications:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch notifications: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request) {
//   try {
//     await connectDB();
//     const { id } = await request.json();
//     const notification = await Notification.findByIdAndUpdate(
//       id,
//       { read: true },
//       { new: true }
//     );
//     if (!notification) {
//       return NextResponse.json(
//         { error: "Notification not found" },
//         { status: 404 }
//       );
//     }
//     return NextResponse.json({ notification });
//   } catch (error) {
//     console.error("Error marking notification as read:", error);
//     return NextResponse.json(
//       { error: "Failed to mark notification as read: " + error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Notification from "@/model/Notification";
import Announcement from "@/model/Announcement";
import Staff from "@/model/Staff";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await connectDB();
    console.log("Models available:", Object.keys(mongoose.models));
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "staff") {
      console.log("Non-staff access attempted:", decoded.role);
      return NextResponse.json(
        { error: "Unauthorized: Staff access required" },
        { status: 403 }
      );
    }

    const staff = await Staff.findById(decoded.id);
    if (!staff) {
      return NextResponse.json({ error: "Staff not found" }, { status: 404 });
    }

    const notifications = await Notification.find({
      userId: decoded.id,
      userModel: "Staff",
    })
      .populate({
        path: "announcementId",
        model: "Announcement",
        select: "audience department flight text createdAt",
      })
      .sort({ createdAt: -1 });

    const formattedNotifications = notifications.map((note) => ({
      id: note._id,
      text: note.text,
      createdAt: note.createdAt,
      read: note.read,
      announcement: note.announcementId,
    }));

    console.log(
      "Fetched notifications for staff:",
      formattedNotifications.length
    );
    return NextResponse.json({ notifications: formattedNotifications });
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch notifications: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    console.log("Models available:", Object.keys(mongoose.models));
    const { id } = await request.json();
    console.log("PUT payload:", { id });

    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "staff") {
      console.log("Non-staff access attempted:", decoded.role);
      return NextResponse.json(
        { error: "Unauthorized: Staff access required" },
        { status: 403 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: "Notification ID is required" },
        { status: 400 }
      );
    }

    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId: decoded.id, userModel: "Staff" },
      { read: true },
      { new: true }
    );

    if (!notification) {
      return NextResponse.json(
        { error: "Notification not found" },
        { status: 404 }
      );
    }

    console.log("Notification marked as read:", id);
    return NextResponse.json({ message: "Notification marked as read" });
  } catch (error) {
    console.error("Error marking notification as read:", error.message);
    return NextResponse.json(
      { error: "Failed to mark notification as read: " + error.message },
      { status: 500 }
    );
  }
}
