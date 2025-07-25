// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import Admin from "@/model/Admin";
// import bcrypt from "bcryptjs";

// export async function POST(req) {
//   await dbConnect();

//   const { email, password } = await req.json();

//   const admin = await Admin.findOne({ email });
//   if (!admin) {
//     return NextResponse.json(
//       { error: "Invalid email or password" },
//       { status: 401 }
//     );
//   }

//   const isMatch = await bcrypt.compare(password, admin.password);
//   if (!isMatch) {
//     return NextResponse.json(
//       { error: "Invalid email or password" },
//       { status: 401 }
//     );
//   }

//   // Return face descriptor for frontend comparison
//   return NextResponse.json({
//     success: true,
//     faceDescriptor: Array.from(admin.faceDescriptor),
//   });
// }

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import connectDB from "@/lib/db";
// import Admin from "@/model/Admin";
// import Passenger from "@/model/Passenger";
// import { generateToken } from "@/lib/auth";

// const sentences = [
//   "I love flying high in the sky.",
//   "Traveling is my favorite hobby.",
//   "Airplanes are safe and fast.",
//   "Welcome aboard the AeroVision flight.",
//   "Please fasten your seatbelt securely.",
// ];

// export async function POST(req) {
//   await connectDB();

//   const data = await req.json();
//   const { email, password, spokenSentence, targetSentence } = data;

//   if (!email || !password) {
//     return NextResponse.json(
//       { error: "Email and password are required." },
//       { status: 400 }
//     );
//   }

//   // First, check admin
//   const admin = await Admin.findOne({ email });
//   if (admin) {
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { error: "Invalid admin credentials." },
//         { status: 401 }
//       );
//     }

//     const token = generateToken({ id: admin._id, role: "admin" });

//     return NextResponse.json({
//       message: "Admin login successful.",
//       faceDescriptor: admin.faceDescriptor,
//       token,
//     });
//   }

//   // Check passenger
//   const passenger = await Passenger.findOne({ email });
//   if (!passenger) {
//     return NextResponse.json({ error: "User not found." }, { status: 404 });
//   }

//   const isMatch = await bcrypt.compare(password, passenger.password);
//   if (!isMatch) {
//     return NextResponse.json(
//       { error: "Invalid passenger credentials." },
//       { status: 401 }
//     );
//   }

//   // If spokenSentence not yet submitted — return challenge
//   // If spokenSentence not yet submitted — ask to speak silently
//   if (!spokenSentence) {
//     const token = generateToken({ id: passenger._id, role: "passenger" });

//     return NextResponse.json({
//       message: "Passenger credentials valid.",
//       requireSpeech: true,
//       token,
//       targetSentence: passenger.targetSentence, // 🔥 Add this!
//     });
//   }

//   // Verify voice sentence match
//   // Normalize helper
//   const normalize = (text) =>
//     text
//       .toLowerCase()
//       .replace(/[.,!?]/g, "")
//       .replace(/\s+/g, "")
//       .trim();

//   if (normalize(spokenSentence) !== normalize(passenger.spokenSentence)) {
//     return NextResponse.json(
//       { error: "Spoken sentence does not match." },
//       { status: 400 }
//     );
//   }

//   const token = generateToken({ id: passenger._id, role: "passenger" });

//   return NextResponse.json({
//     message: "Passenger login successful.",
//     token,
//   });
// }

// import { NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
// import connectDB from "@/lib/db";
// import Admin from "@/model/Admin";
// import Passenger from "@/model/Passenger";
// import { generateToken } from "@/lib/auth";

// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "strict",
//   path: "/", // very important!
//   maxAge: 60 * 60 * 24, // 1 day
// };

// const sentences = [
//   "I love flying high in the sky.",
//   "Traveling is my favorite hobby.",
//   "Airplanes are safe and fast.",
//   "Welcome aboard the AeroVision flight.",
//   "Please fasten your seatbelt securely.",
// ];

// export async function POST(req) {
//   await connectDB();

//   const data = await req.json();
//   const { email, password, spokenSentence } = data;

//   if (!email || !password) {
//     return NextResponse.json(
//       { error: "Email and password are required." },
//       { status: 400 }
//     );
//   }

//   // Check for Admin
//   const admin = await Admin.findOne({ email });
//   if (admin) {
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { error: "Invalid admin credentials." },
//         { status: 401 }
//       );
//     }

//     const token = generateToken({ id: admin._id, role: "admin" });

//     const response = NextResponse.json({
//       message: "Admin login successful.",
//       faceDescriptor: admin.faceDescriptor,
//     });

//     response.cookies.set("token", token, cookieOptions);
//     return response;
//   }

//   // Check for Passenger
//   const passenger = await Passenger.findOne({ email });
//   if (!passenger) {
//     return NextResponse.json({ error: "User not found." }, { status: 404 });
//   }

//   const isMatch = await bcrypt.compare(password, passenger.password);
//   if (!isMatch) {
//     return NextResponse.json(
//       { error: "Invalid passenger credentials." },
//       { status: 401 }
//     );
//   }

//   // If speech not yet submitted
//   if (!spokenSentence) {
//     const token = generateToken({ id: passenger._id, role: "passenger" });

//     const response = NextResponse.json({
//       message: "Passenger credentials valid.",
//       requireSpeech: true,
//       targetSentence: passenger.targetSentence,
//     });

//     response.cookies.set("token", token, cookieOptions);
//     return response;
//   }

//   // Normalize function
//   const normalize = (text) =>
//     text
//       .toLowerCase()
//       .replace(/[.,!?]/g, "")
//       .replace(/\s+/g, "")
//       .trim();

//   if (normalize(spokenSentence) !== normalize(passenger.spokenSentence)) {
//     return NextResponse.json(
//       { error: "Spoken sentence does not match." },
//       { status: 400 }
//     );
//   }

//   const token = generateToken({ id: passenger._id, role: "passenger" });

//   const response = NextResponse.json({
//     message: "Passenger login successful.",
//   });

//   response.cookies.set("token", token, cookieOptions);
//   return response;
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import Admin from "@/model/Admin";
import Passenger from "@/model/Passenger";
import Staff from "@/model/Staff"; // <-- Add this
import { generateToken } from "@/lib/auth";
import LoginHistory from "@/model/LoginLogoutHistory";

// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "strict",
//   path: "/",
//   maxAge: 60 * 60 * 24, // 1 day
// };
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // ✅ secure only in prod
  sameSite: "lax", // ✅ allows redirect-based login flows
  path: "/",
  maxAge: 60 * 60 * 24,
};

// export async function POST(req) {
//   await connectDB();

//   const data = await req.json();
//   const { email, password, spokenSentence } = data;

//   if (!email || !password) {
//     return NextResponse.json(
//       { error: "Email and password are required." },
//       { status: 400 }
//     );
//   }

//   // ✅ Check Admin
//   const admin = await Admin.findOne({ email });
//   if (admin) {
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch)
//       return NextResponse.json(
//         { error: "Invalid admin credentials." },
//         { status: 401 }
//       );

//     const token = generateToken({ id: admin._id, role: "admin" });

//     const response = NextResponse.json({
//       message: "Admin login successful.",
//       faceDescriptor: admin.faceDescriptor,
//     });

//     response.cookies.set("token", token, cookieOptions);
//     return response;
//   }

//   // ✅ Check Passenger
//   const passenger = await Passenger.findOne({ email });
//   if (passenger) {
//     const isMatch = await bcrypt.compare(password, passenger.password);
//     if (!isMatch)
//       return NextResponse.json(
//         { error: "Invalid passenger credentials." },
//         { status: 401 }
//       );

//     if (!spokenSentence) {
//       const token = generateToken({ id: passenger._id, role: "passenger" });

//       const response = NextResponse.json({
//         message: "Passenger credentials valid.",
//         requireSpeech: true,
//         targetSentence: passenger.targetSentence,
//       });

//       response.cookies.set("token", token, cookieOptions);
//       // console.log("Token:", token); // ✅ See if token is created
//       // console.log("Cookies:", response.cookies); // ✅ Should show token being set
//       return response;
//     }

//     const normalize = (text) =>
//       text
//         .toLowerCase()
//         .replace(/[.,!?]/g, "")
//         .replace(/\s+/g, "")
//         .trim();

//     if (normalize(spokenSentence) !== normalize(passenger.spokenSentence)) {
//       return NextResponse.json(
//         { error: "Spoken sentence does not match." },
//         { status: 400 }
//       );
//     }

//     const token = generateToken({ id: passenger._id, role: "passenger" });

//     const response = NextResponse.json({
//       message: "Passenger login successful.",
//     });
//     response.cookies.set("token", token, cookieOptions);
//     return response;
//   }

//   // ✅ Check Staff (new block)
//   const staff = await Staff.findOne({ email });
//   if (staff) {
//     const isMatch = await bcrypt.compare(password, staff.password);
//     if (!isMatch)
//       return NextResponse.json(
//         { error: "Invalid staff credentials." },
//         { status: 401 }
//       );

//     const token = generateToken({ id: staff._id, role: "staff" });

//     const response = NextResponse.json({ message: "Staff login successful." });
//     response.cookies.set("token", token, cookieOptions);
//     // console.log("Token:", token); // ✅ See if token is created
//     // console.log("Cookies:", response.cookies); // ✅ Should show token being set

//     return response;
//   }

//   return NextResponse.json({ error: "User not found." }, { status: 404 });
// }

// export async function POST(req) {
//   await connectDB();
//   const data = await req.json();
//   const { email, password, spokenSentence } = data;

//   if (!email || !password) {
//     return NextResponse.json(
//       { error: "Email and password are required." },
//       { status: 400 }
//     );
//   }

//   // --- Admin ---
//   const admin = await Admin.findOne({ email });
//   if (admin) {
//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch)
//       return NextResponse.json(
//         { error: "Invalid admin credentials." },
//         { status: 401 }
//       );

//     const token = generateToken({ id: admin._id, role: "admin" });
//     const response = NextResponse.json({
//       message: "Admin login successful.",
//       faceDescriptor: admin.faceDescriptor,
//     });

//     response.cookies.set("token", token, cookieOptions);

//     // ✅ Log Login
//     await LoginHistory.create({
//       userId: admin._id,
//       role: "admin", // was userType
//       action: "login",
//     });

//     return response;
//   }

//   // --- Passenger ---
//   const passenger = await Passenger.findOne({ email });
//   if (passenger) {
//     if (passenger.isBlocked === "Y") {
//       return NextResponse.json(
//         { error: "You are blocked. Kindly call the admin." },
//         { status: 403 }
//       );
//     }

//     const isMatch = await bcrypt.compare(password, passenger.password);
//     if (!isMatch)
//       return NextResponse.json(
//         { error: "Invalid passenger credentials." },
//         { status: 401 }
//       );

//     if (!spokenSentence) {
//       const token = generateToken({ id: passenger._id, role: "passenger" });

//       const response = NextResponse.json({
//         message: "Passenger credentials valid.",
//         requireSpeech: true,
//         targetSentence: passenger.targetSentence,
//       });

//       response.cookies.set("token", token, cookieOptions);
//       return response;
//     }

//     const normalize = (text) =>
//       text
//         .toLowerCase()
//         .replace(/[.,!?]/g, "")
//         .replace(/\s+/g, "")
//         .trim();

//     if (normalize(spokenSentence) !== normalize(passenger.spokenSentence)) {
//       return NextResponse.json(
//         { error: "Spoken sentence does not match." },
//         { status: 400 }
//       );
//     }

//     const token = generateToken({ id: passenger._id, role: "passenger" });

//     const response = NextResponse.json({
//       message: "Passenger login successful.",
//     });
//     response.cookies.set("token", token, cookieOptions);

//     // ✅ Log Login
//     await LoginHistory.create({
//       userId: passenger._id,
//       role: "passenger", // was userType
//       action: "login",
//     });

//     return response;
//   }

//   // --- Staff ---
//   const staff = await Staff.findOne({ email });
//   if (staff) {
//     if (staff.isBlocked === "Y") {
//       return NextResponse.json(
//         { error: "You are blocked. Kindly call the admin." },
//         { status: 403 }
//       );
//     }

//     const isMatch = await bcrypt.compare(password, staff.password);
//     if (!isMatch)
//       return NextResponse.json(
//         { error: "Invalid staff credentials." },
//         { status: 401 }
//       );

//     const token = generateToken({ id: staff._id, role: "staff" });

//     const response = NextResponse.json({ message: "Staff login successful." });
//     response.cookies.set("token", token, cookieOptions);

//     // ✅ Log Login
//    await LoginHistory.create({
//   userId: staff._id,
//   role: "staff", // was userType
//   action: "login",
// });

//     return response;
//   }

//   return NextResponse.json({ error: "User not found." }, { status: 404 });
// }

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const { email, password, spokenSentence, token } = data;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  // --- Admin ---
  const admin = await Admin.findOne({ email });
  if (admin) {
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Invalid admin credentials." },
        { status: 401 }
      );

    const token = generateToken({ id: admin._id, role: "admin" });
    const response = NextResponse.json({
      role: "admin",
      isBlocked: admin.isBlocked || "N",
      faceDescriptor: admin.faceDescriptor,
      token,
    });

    response.cookies.set("token", token, cookieOptions);

    // Log Login
    await LoginHistory.create({
      userId: admin._id,
      role: "admin",
      action: "login",
    });

    return response;
  }

  // --- Passenger ---
  const passenger = await Passenger.findOne({ email });
  if (passenger) {
    const isMatch = await bcrypt.compare(password, passenger.password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Invalid passenger credentials." },
        { status: 401 }
      );

    const token = generateToken({ id: passenger._id, role: "passenger" });

    if (passenger.isBlocked === "Y") {
      const response = NextResponse.json({
        role: "passenger",
        isBlocked: "Y",
        token,
      });
      response.cookies.set("token", token, cookieOptions);
      return response;
    }

    if (!spokenSentence) {
      const response = NextResponse.json({
        role: "passenger",
        isBlocked: "N",
        requireSpeech: true,
        targetSentence: passenger.targetSentence,
        token,
      });
      response.cookies.set("token", token, cookieOptions);
      return response;
    }

    const normalize = (text) =>
      text
        .toLowerCase()
        .replace(/[.,!?]/g, "")
        .replace(/\s+/g, "")
        .trim();

    if (normalize(spokenSentence) !== normalize(passenger.targetSentence)) {
      return NextResponse.json(
        { error: "Spoken sentence does not match." },
        { status: 400 }
      );
    }

    const response = NextResponse.json({
      role: "passenger",
      isBlocked: "N",
      message: "Passenger login successful.",
      token,
    });
    response.cookies.set("token", token, cookieOptions);

    // Log Login
    await LoginHistory.create({
      userId: passenger._id,
      role: "passenger",
      action: "login",
    });

    return response;
  }

  // --- Staff ---
  const staff = await Staff.findOne({ email });
  if (staff) {
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch)
      return NextResponse.json(
        { error: "Invalid staff credentials." },
        { status: 401 }
      );

    const token = generateToken({ id: staff._id, role: "staff" });

    if (staff.isBlocked === "Y") {
      const response = NextResponse.json({
        role: "staff",
        isBlocked: "Y",
        token,
      });
      response.cookies.set("token", token, cookieOptions);
      return response;
    }

    const response = NextResponse.json({
      role: "staff",
      isBlocked: "N",
      message: "Staff login successful.",
      token,
    });
    response.cookies.set("token", token, cookieOptions);

    // Log Login
    await LoginHistory.create({
      userId: staff._id,
      role: "staff",
      action: "login",
    });

    return response;
  }

  return NextResponse.json({ error: "User not found." }, { status: 404 });
}
