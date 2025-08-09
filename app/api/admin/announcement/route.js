// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Admin from "@/model/Admin"; // Explicitly import Admin
// import Announcement from "@/model/Announcement";
// import Flight from "@/model/Flight";
// import Airline from "@/model/Airline"; // Import to ensure Flight's airline reference works
// import Gate from "@/model/Gate"; // Import to ensure Flight's gate reference works
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export async function GET(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models)); // Debug: List registered models
//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const announcements = await Announcement.find()
//       .populate("createdBy", "email")
//       .sort({ createdAt: -1 });
//     const flights = await Flight.find().select("flightNumber");
//     console.log(
//       "Fetched announcements:",
//       announcements.length,
//       "flights:",
//       flights.length
//     );
//     return NextResponse.json({
//       announcements,
//       flights: flights.map((f) => f.flightNumber),
//     });
//   } catch (error) {
//     console.error("Error fetching announcements or flights:", error.message);
//     return NextResponse.json(
//       { error: "Failed to fetch data: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models)); // Debug: List registered models
//     const { audience, department, flight, text } = await request.json();
//     console.log("POST payload:", { audience, department, flight, text });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!text || !text.trim()) {
//       return NextResponse.json(
//         { error: "Announcement text is required" },
//         { status: 400 }
//       );
//     }
//     if (audience === "Staff" && !department) {
//       return NextResponse.json(
//         { error: "Department is required for staff announcements" },
//         { status: 400 }
//       );
//     }
//     if (audience === "Passenger" && !flight) {
//       return NextResponse.json(
//         { error: "Flight is required for passenger announcements" },
//         { status: 400 }
//       );
//     }

//     const announcement = new Announcement({
//       audience,
//       department,
//       flight,
//       text,
//       createdBy: decoded.id,
//     });
//     await announcement.save();
//     console.log("Announcement saved:", announcement._id);

//     return NextResponse.json({ announcement });
//   } catch (error) {
//     console.error("Error creating announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to create announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Admin from "@/model/Admin";
// import Announcement from "@/model/Announcement";
// import Flight from "@/model/Flight";
// import Airline from "@/model/Airline";
// import Gate from "@/model/Gate";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export async function GET(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const announcements = await Announcement.find()
//       .populate("createdBy", "email")
//       .sort({ createdAt: -1 });
//     console.log("Fetched announcements:", announcements.length);
//     return NextResponse.json({
//       announcements,
//     });
//   } catch (error) {
//     console.error("Error fetching announcements:", error.message);
//     return NextResponse.json(
//       { error: "Failed to fetch data: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { id, text } = await request.json();
//     console.log("PUT payload:", { id, text });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!text || !text.trim()) {
//       return NextResponse.json(
//         { error: "Announcement text is required" },
//         { status: 400 }
//       );
//     }
//     if (!id) {
//       return NextResponse.json(
//         { error: "Announcement ID is required" },
//         { status: 400 }
//       );
//     }

//     const announcement = await Announcement.findById(id);
//     if (!announcement) {
//       return NextResponse.json(
//         { error: "Announcement not found" },
//         { status: 404 }
//       );
//     }

//     announcement.text = text;
//     announcement.createdAt = new Date(); // Update timestamp
//     await announcement.save();
//     console.log("Announcement updated:", announcement._id);

//     return NextResponse.json({ announcement });
//   } catch (error) {
//     console.error("Error updating announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to update announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { id } = await request.json();
//     console.log("DELETE payload:", { id });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!id) {
//       return NextResponse.json(
//         { error: "Announcement ID is required" },
//         { status: 400 }
//       );
//     }

//     const announcement = await Announcement.findByIdAndDelete(id);
//     if (!announcement) {
//       return NextResponse.json(
//         { error: "Announcement not found" },
//         { status: 404 }
//       );
//     }

//     console.log("Announcement deleted:", id);
//     return NextResponse.json({ message: "Announcement deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to delete announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Admin from "@/model/Admin";
// import Announcement from "@/model/Announcement";
// import Notification from "@/model/Notification";
// import Staff from "@/model/Staff";
// import Passenger from "@/model/Passenger";
// import Flight from "@/model/Flight";
// import Airline from "@/model/Airline";
// import Gate from "@/model/Gate";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export async function GET(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const announcements = await Announcement.find()
//       .populate("createdBy", "email")
//       .sort({ createdAt: -1 });
//     console.log("Fetched announcements:", announcements.length);
//     return NextResponse.json({
//       announcements,
//     });
//   } catch (error) {
//     console.error("Error fetching announcements:", error.message);
//     return NextResponse.json(
//       { error: "Failed to fetch data: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { audience, department, flight, text } = await request.json();
//     console.log("POST payload:", { audience, department, flight, text });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!text || !text.trim()) {
//       return NextResponse.json(
//         { error: "Announcement text is required" },
//         { status: 400 }
//       );
//     }
//     if (audience === "Staff" && !department) {
//       return NextResponse.json(
//         { error: "Department is required for staff announcements" },
//         { status: 400 }
//       );
//     }
//     if (audience === "Passenger" && !flight) {
//       return NextResponse.json(
//         { error: "Flight is required for passenger announcements" },
//         { status: 400 }
//       );
//     }

//     const announcement = new Announcement({
//       audience,
//       department,
//       flight,
//       text,
//       createdBy: decoded.id,
//     });
//     await announcement.save();
//     console.log("Announcement saved:", announcement._id);

//     // Generate notifications
//     let notifications = [];
//     if (audience === "All") {
//       const staff = await Staff.find();
//       const passengers = await Passenger.find();
//       notifications = [
//         ...staff.map((user) => ({
//           announcementId: announcement._id,
//           userId: user._id,
//           userModel: "Staff",
//           text: announcement.text,
//         })),
//         ...passengers.map((user) => ({
//           announcementId: announcement._id,
//           userId: user._id,
//           userModel: "Passenger",
//           text: announcement.text,
//         })),
//       ];
//     } else if (audience === "Staff") {
//       const staff = await Staff.find({ department });
//       notifications = staff.map((user) => ({
//         announcementId: announcement._id,
//         userId: user._id,
//         userModel: "Staff",
//         text: announcement.text,
//       }));
//     } else if (audience === "Passenger") {
//       const passengers = await Passenger.find({ flight });
//       notifications = passengers.map((user) => ({
//         announcementId: announcement._id,
//         userId: user._id,
//         userModel: "Passenger",
//         text: announcement.text,
//       }));
//     }

//     if (notifications.length > 0) {
//       await Notification.insertMany(notifications);
//       console.log("Notifications created:", notifications.length);
//     }

//     return NextResponse.json({ announcement });
//   } catch (error) {
//     console.error("Error creating announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to create announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { id, text } = await request.json();
//     console.log("PUT payload:", { id, text });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!text || !text.trim()) {
//       return NextResponse.json(
//         { error: "Announcement text is required" },
//         { status: 400 }
//       );
//     }
//     if (!id) {
//       return NextResponse.json(
//         { error: "Announcement ID is required" },
//         { status: 400 }
//       );
//     }

//     const announcement = await Announcement.findById(id);
//     if (!announcement) {
//       return NextResponse.json(
//         { error: "Announcement not found" },
//         { status: 404 }
//       );
//     }

//     announcement.text = text;
//     announcement.createdAt = new Date(); // Update timestamp
//     await announcement.save();
//     console.log("Announcement updated:", announcement._id);

//     // Update corresponding notifications
//     await Notification.updateMany(
//       { announcementId: id },
//       { text, createdAt: new Date() }
//     );
//     console.log("Notifications updated for announcement:", id);

//     return NextResponse.json({ announcement });
//   } catch (error) {
//     console.error("Error updating announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to update announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { id } = await request.json();
//     console.log("DELETE payload:", { id });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!id) {
//       return NextResponse.json(
//         { error: "Announcement ID is required" },
//         { status: 400 }
//       );
//     }

//     const announcement = await Announcement.findByIdAndDelete(id);
//     if (!announcement) {
//       return NextResponse.json(
//         { error: "Announcement not found" },
//         { status: 404 }
//       );
//     }

//     // Delete corresponding notifications
//     await Notification.deleteMany({ announcementId: id });
//     console.log("Announcement and notifications deleted:", id);

//     return NextResponse.json({ message: "Announcement deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to delete announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Admin from "@/model/Admin";
// import Announcement from "@/model/Announcement";
// import Notification from "@/model/Notification";
// import Staff from "@/model/Staff";
// import Passenger from "@/model/Passenger";
// import Flight from "@/model/Flight";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export async function GET(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const announcements = await Announcement.find()
//       .populate("createdBy", "email")
//       .sort({ createdAt: -1 });
//     const flights = await Flight.find().select("flightNumber");
//     console.log(
//       "Fetched announcements:",
//       announcements.length,
//       "Fetched flights:",
//       flights.length
//     );
//     return NextResponse.json({
//       announcements,
//       flights: flights.map((flight) => flight.flightNumber),
//     });
//   } catch (error) {
//     console.error("Error fetching announcements:", error.message);
//     return NextResponse.json(
//       { error: "Failed to fetch data: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { audience, role, flight, text } = await request.json();
//     console.log("POST payload:", { audience, role, flight, text });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!text || !text.trim()) {
//       return NextResponse.json(
//         { error: "Announcement text is required" },
//         { status: 400 }
//       );
//     }
//     if (audience === "Staff" && !role) {
//       return NextResponse.json(
//         { error: "Role is required for staff announcements" },
//         { status: 400 }
//       );
//     }
//     if (audience === "Passenger" && !flight) {
//       return NextResponse.json(
//         { error: "Flight is required for passenger announcements" },
//         { status: 400 }
//       );
//     }

//     // Validate role and flight
//     if (audience === "Staff" && role) {
//       const validRoles = [
//         "Technical",
//         "Security",
//         "Maintenance",
//         "Other",
//         "All",
//       ];
//       if (!validRoles.includes(role)) {
//         console.log("Invalid role:", role);
//         return NextResponse.json(
//           { error: `Invalid role. Must be one of: ${validRoles.join(", ")}` },
//           { status: 400 }
//         );
//       }
//     }
//     if (audience === "Passenger" && flight) {
//       const flightExists = await Flight.findOne({ flightNumber: flight });
//       if (!flightExists) {
//         console.log("Flight not found:", flight);
//         return NextResponse.json(
//           { error: `Flight ${flight} not found` },
//           { status: 400 }
//         );
//       }
//     }

//     const announcement = new Announcement({
//       audience,
//       role,
//       flight,
//       text,
//       createdBy: decoded.id,
//     });
//     await announcement.save();
//     console.log("Announcement saved:", announcement._id);

//     // Generate notifications
//     let notifications = [];
//     if (audience === "All") {
//       const staff = await Staff.find();
//       const passengers = await Passenger.find();
//       console.log(
//         "Staff found:",
//         staff.length,
//         "Passengers found:",
//         passengers.length
//       );
//       notifications = [
//         ...staff.map((user) => ({
//           announcementId: announcement._id,
//           userId: user._id,
//           userModel: "Staff",
//           text: announcement.text,
//           createdAt: announcement.createdAt,
//         })),
//         ...passengers.map((user) => ({
//           announcementId: announcement._id,
//           userId: user._id,
//           userModel: "Passenger",
//           text: announcement.text,
//           createdAt: announcement.createdAt,
//         })),
//       ];
//     } else if (audience === "Staff") {
//       const staff = await Staff.find({ role });
//       console.log("Staff found for role", role, ":", staff.length);
//       notifications = staff.map((user) => ({
//         announcementId: announcement._id,
//         userId: user._id,
//         userModel: "Staff",
//         text: announcement.text,
//         createdAt: announcement.createdAt,
//       }));
//     } else if (audience === "Passenger") {
//       const passengers = await Passenger.find({ flight });
//       console.log(
//         "Passengers found for flight",
//         flight,
//         ":",
//         passengers.length
//       );
//       notifications = passengers.map((user) => ({
//         announcementId: announcement._id,
//         userId: user._id,
//         userModel: "Passenger",
//         text: announcement.text,
//         createdAt: announcement.createdAt,
//       }));
//     }

//     if (notifications.length > 0) {
//       await Notification.insertMany(notifications);
//       console.log("Notifications created:", notifications.length);
//     } else {
//       console.log("No notifications created: no matching users found");
//     }

//     return NextResponse.json({ announcement });
//   } catch (error) {
//     console.error("Error creating announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to create announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { id, text } = await request.json();
//     console.log("PUT payload:", { id, text });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!text || !text.trim()) {
//       return NextResponse.json(
//         { error: "Announcement text is required" },
//         { status: 400 }
//       );
//     }
//     if (!id) {
//       return NextResponse.json(
//         { error: "Announcement ID is required" },
//         { status: 400 }
//       );
//     }

//     const announcement = await Announcement.findById(id);
//     if (!announcement) {
//       return NextResponse.json(
//         { error: "Announcement not found" },
//         { status: 404 }
//       );
//     }

//     announcement.text = text;
//     announcement.createdAt = new Date();
//     await announcement.save();
//     console.log("Announcement updated:", announcement._id);

//     // Update corresponding notifications
//     await Notification.updateMany(
//       { announcementId: id },
//       { text, createdAt: new Date() }
//     );
//     console.log("Notifications updated for announcement:", id);

//     return NextResponse.json({ announcement });
//   } catch (error) {
//     console.error("Error updating announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to update announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { id } = await request.json();
//     console.log("DELETE payload:", { id });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!id) {
//       return NextResponse.json(
//         { error: "Announcement ID is required" },
//         { status: 400 }
//       );
//     }

//     const announcement = await Announcement.findByIdAndDelete(id);
//     if (!announcement) {
//       return NextResponse.json(
//         { error: "Announcement not found" },
//         { status: 404 }
//       );
//     }

//     // Delete corresponding notifications
//     await Notification.deleteMany({ announcementId: id });
//     console.log("Announcement and notifications deleted:", id);

//     return NextResponse.json({ message: "Announcement deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to delete announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Admin from "@/model/Admin";
// import Announcement from "@/model/Announcement";
// import Notification from "@/model/Notification";
// import Staff from "@/model/Staff";
// import Passenger from "@/model/Passenger";
// import Flight from "@/model/Flight";
// import Booking from "@/model/Booking";
// import jwt from "jsonwebtoken";
// import mongoose from "mongoose";

// export async function GET(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     const announcements = await Announcement.find()
//       .populate("createdBy", "email")
//       .sort({ createdAt: -1 });
//     const flights = await Flight.find().select("flightNumber");
//     console.log(
//       "Fetched announcements:",
//       announcements.length,
//       "Fetched flights:",
//       flights.length
//     );
//     return NextResponse.json({
//       announcements,
//       flights: flights.map((flight) => flight.flightNumber),
//     });
//   } catch (error) {
//     console.error("Error fetching announcements:", error.message);
//     return NextResponse.json(
//       { error: "Failed to fetch data: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { audience, role, flight, text } = await request.json();
//     console.log("POST payload:", { audience, role, flight, text });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!text || !text.trim()) {
//       return NextResponse.json(
//         { error: "Announcement text is required" },
//         { status: 400 }
//       );
//     }
//     if (audience === "Staff" && !role) {
//       return NextResponse.json(
//         { error: "Role is required for staff announcements" },
//         { status: 400 }
//       );
//     }
//     if (audience === "Passenger" && flight && flight !== "All Passengers") {
//       const flightExists = await Flight.findOne({ flightNumber: flight });
//       if (!flightExists) {
//         console.log("Flight not found:", flight);
//         return NextResponse.json(
//           { error: `Flight ${flight} not found` },
//           { status: 400 }
//         );
//       }
//     }

//     // Validate role
//     if (audience === "Staff" && role) {
//       const validRoles = [
//         "Technical",
//         "Security",
//         "Maintenance",
//         "Other",
//         "All",
//       ];
//       if (!validRoles.includes(role)) {
//         console.log("Invalid role:", role);
//         return NextResponse.json(
//           { error: `Invalid role. Must be one of: ${validRoles.join(", ")}` },
//           { status: 400 }
//         );
//       }
//     }

//     const announcement = new Announcement({
//       audience,
//       role: audience === "Staff" ? role : null,
//       flight:
//         audience === "Passenger" && flight !== "All Passengers" ? flight : null,
//       text,
//       createdBy: decoded.id,
//     });
//     await announcement.save();
//     console.log("Announcement saved:", announcement._id);

//     // Generate notifications
//     let notifications = [];
//     if (audience === "All") {
//       const staff = await Staff.find();
//       const passengers = await Passenger.find();
//       console.log(
//         "Staff found:",
//         staff.length,
//         "Passengers found:",
//         passengers.length
//       );
//       notifications = [
//         ...staff.map((user) => ({
//           announcementId: announcement._id,
//           userId: user._id,
//           userModel: "Staff",
//           text: announcement.text,
//           createdAt: announcement.createdAt,
//         })),
//         ...passengers.map((user) => ({
//           announcementId: announcement._id,
//           userId: user._id,
//           userModel: "Passenger",
//           text: announcement.text,
//           createdAt: announcement.createdAt,
//         })),
//       ];
//     } else if (audience === "Staff") {
//       const staff = await Staff.find({ role });
//       console.log("Staff found for role", role, ":", staff.length);
//       notifications = staff.map((user) => ({
//         announcementId: announcement._id,
//         userId: user._id,
//         userModel: "Staff",
//         text: announcement.text,
//         createdAt: announcement.createdAt,
//       }));
//     } else if (audience === "Passenger") {
//       if (flight && flight !== "All Passengers") {
//         const flightRecord = await Flight.findOne({ flightNumber: flight });
//         if (flightRecord) {
//           const bookings = await Booking.find({
//             flight: flightRecord._id,
//             status: "Confirmed",
//           }).populate("passenger", "email");
//           console.log(
//             "Bookings found for flight",
//             flight,
//             ":",
//             bookings.length,
//             "Passenger emails:",
//             bookings.map((b) => b.passenger?.email || "Unknown")
//           );
//           notifications = bookings
//             .filter((booking) => booking.passenger) // Ensure passenger exists
//             .map((booking) => ({
//               announcementId: announcement._id,
//               userId: booking.passenger._id,
//               userModel: "Passenger",
//               text: announcement.text,
//               createdAt: announcement.createdAt,
//             }));
//         } else {
//           console.log("No flight record found for", flight);
//         }
//       } else {
//         // All passengers
//         const bookings = await Booking.find({ status: "Confirmed" }).populate(
//           "passenger",
//           "email"
//         );
//         const passengerIds = [
//           ...new Set(
//             bookings.map((b) => b.passenger?._id.toString()).filter(Boolean)
//           ),
//         ];
//         console.log(
//           "Bookings found for all passengers:",
//           bookings.length,
//           "Unique passenger IDs:",
//           passengerIds.length,
//           "Passenger emails:",
//           bookings.map((b) => b.passenger?.email || "Unknown")
//         );
//         notifications = passengerIds.map((passengerId) => ({
//           announcementId: announcement._id,
//           userId: passengerId,
//           userModel: "Passenger",
//           text: announcement.text,
//           createdAt: announcement.createdAt,
//         }));
//       }
//     }

//     if (notifications.length > 0) {
//       await Notification.insertMany(notifications);
//       console.log("Notifications created:", notifications.length);
//     } else {
//       console.log("No notifications created: no matching users found");
//     }

//     return NextResponse.json({ announcement });
//   } catch (error) {
//     console.error("Error creating announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to create announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { id, text } = await request.json();
//     console.log("PUT payload:", { id, text });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!text || !text.trim()) {
//       return NextResponse.json(
//         { error: "Announcement text is required" },
//         { status: 400 }
//       );
//     }
//     if (!id) {
//       return NextResponse.json(
//         { error: "Announcement ID is required" },
//         { status: 400 }
//       );
//     }

//     const announcement = await Announcement.findById(id);
//     if (!announcement) {
//       return NextResponse.json(
//         { error: "Announcement not found" },
//         { status: 404 }
//       );
//     }

//     announcement.text = text;
//     announcement.createdAt = new Date();
//     await announcement.save();
//     console.log("Announcement updated:", announcement._id);

//     // Update corresponding notifications
//     await Notification.updateMany(
//       { announcementId: id },
//       { text, createdAt: new Date() }
//     );
//     console.log("Notifications updated for announcement:", id);

//     return NextResponse.json({ announcement });
//   } catch (error) {
//     console.error("Error updating announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to update announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request) {
//   try {
//     await connectDB();
//     console.log("Models available:", Object.keys(mongoose.models));
//     const { id } = await request.json();
//     console.log("DELETE payload:", { id });

//     const token = request.cookies.get("token")?.value;
//     if (!token) {
//       console.log("No token provided");
//       return NextResponse.json(
//         { error: "Unauthorized: No token provided" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (decoded.role !== "admin") {
//       console.log("Non-admin access attempted:", decoded.role);
//       return NextResponse.json(
//         { error: "Unauthorized: Admin access required" },
//         { status: 403 }
//       );
//     }

//     if (!id) {
//       return NextResponse.json(
//         { error: "Announcement ID is required" },
//         { status: 400 }
//       );
//     }

//     const announcement = await Announcement.findByIdAndDelete(id);
//     if (!announcement) {
//       return NextResponse.json(
//         { error: "Announcement not found" },
//         { status: 404 }
//       );
//     }

//     // Delete corresponding notifications
//     await Notification.deleteMany({ announcementId: id });
//     console.log("Announcement and notifications deleted:", id);

//     return NextResponse.json({ message: "Announcement deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting announcement:", error.message);
//     return NextResponse.json(
//       { error: "Failed to delete announcement: " + error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Admin from "@/model/Admin";
import Announcement from "@/model/Announcement";
import Notification from "@/model/Notification";
import Staff from "@/model/Staff";
import Passenger from "@/model/Passenger";
import Flight from "@/model/Flight";
import Booking from "@/model/Booking";
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
    if (decoded.role !== "admin") {
      console.log("Non-admin access attempted:", decoded.role);
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    const announcements = await Announcement.find()
      .populate("createdBy", "email")
      .sort({ createdAt: -1 });
    const flights = await Flight.find().select("flightNumber");
    console.log(
      "Fetched announcements:",
      announcements.length,
      "Fetched flights:",
      flights.length
    );
    return NextResponse.json({
      announcements,
      flights: flights.map((flight) => flight.flightNumber),
    });
  } catch (error) {
    console.error("Error fetching announcements:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch data: " + error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    console.log("Models available:", Object.keys(mongoose.models));
    const { audience, role, flight, text } = await request.json();
    console.log("POST payload:", { audience, role, flight, text });

    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      console.log("Non-admin access attempted:", decoded.role);
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Announcement text is required" },
        { status: 400 }
      );
    }
    if (audience === "Staff" && !role) {
      return NextResponse.json(
        { error: "Role is required for staff announcements" },
        { status: 400 }
      );
    }
    if (audience === "Passenger" && flight && flight !== "All Passengers") {
      const flightExists = await Flight.findOne({ flightNumber: flight });
      if (!flightExists) {
        console.log("Flight not found:", flight);
        return NextResponse.json(
          { error: `Flight ${flight} not found` },
          { status: 400 }
        );
      }
    }

    // Validate role
    if (audience === "Staff" && role) {
      const validRoles = [
        "Technical",
        "Security",
        "Maintenance",
        "Other",
        "All",
      ];
      if (!validRoles.includes(role)) {
        console.log("Invalid role:", role);
        return NextResponse.json(
          { error: `Invalid role. Must be one of: ${validRoles.join(", ")}` },
          { status: 400 }
        );
      }
    }

    const announcement = new Announcement({
      audience,
      role: audience === "Staff" ? role : null,
      flight:
        audience === "Passenger" && flight !== "All Passengers" ? flight : null,
      text,
      createdBy: decoded.id,
    });
    await announcement.save();
    console.log("Announcement saved:", announcement._id);

    // Generate notifications
    let notifications = [];
    if (audience === "All") {
      const staff = await Staff.find();
      const passengers = await Passenger.find();
      console.log(
        "Staff found:",
        staff.length,
        "Passengers found:",
        passengers.length
      );
      notifications = [
        ...staff.map((user) => ({
          announcementId: announcement._id,
          userId: user._id,
          userModel: "Staff",
          text: announcement.text,
          createdAt: announcement.createdAt,
        })),
        ...passengers.map((user) => ({
          announcementId: announcement._id,
          userId: user._id,
          userModel: "Passenger",
          text: announcement.text,
          createdAt: announcement.createdAt,
        })),
      ];
    } else if (audience === "Staff") {
      const staff = await Staff.find(role === "All" ? {} : { role });
      console.log("Staff found for role", role, ":", staff.length);
      notifications = staff.map((user) => ({
        announcementId: announcement._id,
        userId: user._id,
        userModel: "Staff",
        text: announcement.text,
        createdAt: announcement.createdAt,
      }));
    } else if (audience === "Passenger") {
      if (flight && flight !== "All Passengers") {
        const flightRecord = await Flight.findOne({ flightNumber: flight });
        if (flightRecord) {
          const bookings = await Booking.find({
            flight: flightRecord._id,
            status: "Confirmed",
          }).populate("passenger", "email");
          console.log(
            "Bookings found for flight",
            flight,
            ":",
            bookings.length,
            "Passenger emails:",
            bookings.map((b) => b.passenger?.email || "Unknown")
          );
          notifications = bookings
            .filter((booking) => booking.passenger) // Ensure passenger exists
            .map((booking) => ({
              announcementId: announcement._id,
              userId: booking.passenger._id,
              userModel: "Passenger",
              text: announcement.text,
              createdAt: announcement.createdAt,
            }));
        } else {
          console.log("No flight record found for", flight);
        }
      } else {
        // All passengers
        const bookings = await Booking.find({ status: "Confirmed" }).populate(
          "passenger",
          "email"
        );
        const passengerIds = [
          ...new Set(
            bookings.map((b) => b.passenger?._id.toString()).filter(Boolean)
          ),
        ];
        console.log(
          "Bookings found for all passengers:",
          bookings.length,
          "Unique passenger IDs:",
          passengerIds.length,
          "Passenger emails:",
          bookings.map((b) => b.passenger?.email || "Unknown")
        );
        notifications = passengerIds.map((passengerId) => ({
          announcementId: announcement._id,
          userId: passengerId,
          userModel: "Passenger",
          text: announcement.text,
          createdAt: announcement.createdAt,
        }));
      }
    }

    if (notifications.length > 0) {
      await Notification.insertMany(notifications);
      console.log("Notifications created:", notifications.length);
    } else {
      console.log("No notifications created: no matching users found");
    }

    return NextResponse.json({ announcement });
  } catch (error) {
    console.error("Error creating announcement:", error.message);
    return NextResponse.json(
      { error: "Failed to create announcement: " + error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    console.log("Models available:", Object.keys(mongoose.models));
    const { id, text } = await request.json();
    console.log("PUT payload:", { id, text });

    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      console.log("Non-admin access attempted:", decoded.role);
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    if (!text || !text.trim()) {
      return NextResponse.json(
        { error: "Announcement text is required" },
        { status: 400 }
      );
    }
    if (!id) {
      return NextResponse.json(
        { error: "Announcement ID is required" },
        { status: 400 }
      );
    }

    const announcement = await Announcement.findById(id);
    if (!announcement) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      );
    }

    announcement.text = text;
    announcement.createdAt = new Date();
    await announcement.save();
    console.log("Announcement updated:", announcement._id);

    // Update corresponding notifications
    await Notification.updateMany(
      { announcementId: id },
      { text, createdAt: new Date() }
    );
    console.log("Notifications updated for announcement:", id);

    return NextResponse.json({ announcement });
  } catch (error) {
    console.error("Error updating announcement:", error.message);
    return NextResponse.json(
      { error: "Failed to update announcement: " + error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    console.log("Models available:", Object.keys(mongoose.models));
    const { id } = await request.json();
    console.log("DELETE payload:", { id });

    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("No token provided");
      return NextResponse.json(
        { error: "Unauthorized: No token provided" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin") {
      console.log("Non-admin access attempted:", decoded.role);
      return NextResponse.json(
        { error: "Unauthorized: Admin access required" },
        { status: 403 }
      );
    }

    if (!id) {
      return NextResponse.json(
        { error: "Announcement ID is required" },
        { status: 400 }
      );
    }

    const announcement = await Announcement.findByIdAndDelete(id);
    if (!announcement) {
      return NextResponse.json(
        { error: "Announcement not found" },
        { status: 404 }
      );
    }

    // Delete corresponding notifications
    await Notification.deleteMany({ announcementId: id });
    console.log("Announcement and notifications deleted:", id);

    return NextResponse.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error.message);
    return NextResponse.json(
      { error: "Failed to delete announcement: " + error.message },
      { status: 500 }
    );
  }
}
