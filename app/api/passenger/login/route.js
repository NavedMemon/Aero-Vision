// app/api/passenger/login/route.js
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Admin from "@/model/Admin";
import Passenger from "@/model/Passenger";
import bcrypt from "bcryptjs";
import { createToken } from "@/lib/auth"; // Ensure this is exported correctly

// Example sentences for speech verification
const sentences = [
  "I love flying high in the sky.",
  "Traveling is my favorite hobby.",
  "Airplanes are safe and fast.",
  "Welcome aboard the AeroVision flight.",
  "Please fasten your seatbelt securely.",
];

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const { email, password, spokenSentence, targetSentence } = data;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }

  // First check if user is an admin
  const admin = await Admin.findOne({ email });
  if (admin) {
    const isMatch =
      password === admin.password ||
      (await bcrypt.compare(password, admin.password));
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password." }, { status: 401 });
    }

    const token = createToken({ id: admin._id, role: "admin" });

    return NextResponse.json({
      message: "Admin credentials valid.",
      faceDescriptor: admin.faceDescriptor,
      token,
    });
  }

  // Then check if user is a passenger
  const passenger = await Passenger.findOne({ email });
  if (!passenger) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const isMatch =
    password === passenger.password ||
    (await bcrypt.compare(password, passenger.password));
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  // If voice stage not submitted yet
  if (!spokenSentence || !targetSentence) {
    const sentence = sentences[Math.floor(Math.random() * sentences.length)];
    const token = createToken({ id: passenger._id, role: "passenger" });

    return NextResponse.json({
      message: "Passenger credentials valid.",
      targetSentence: sentence,
      token,
    });
  }

  // Verify spoken sentence
  if (
    spokenSentence.trim().toLowerCase() !== targetSentence.trim().toLowerCase()
  ) {
    return NextResponse.json(
      { error: "Spoken sentence does not match." },
      { status: 400 }
    );
  }

  const token = createToken({ id: passenger._id, role: "passenger" });
  return NextResponse.json({ message: "Passenger login successful", token });
}
