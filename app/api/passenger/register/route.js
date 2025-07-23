// // app/api/passenger/register/route.js
// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Passenger from "@/model/Passenger";

// // Example sentences
// const sentences = [
//   "I love flying high in the sky.",
//   "Traveling is my favorite hobby.",
//   "Airplanes are safe and fast.",
//   "Welcome aboard the AeroVision flight.",
//   "Please fasten your seatbelt securely.",
// ];

// // Utility: Normalize and compare spoken and target sentences
// function normalizeSentence(sentence) {
//   return sentence
//     .toLowerCase()
//     .replace(/[.,!?]/g, "") // Remove punctuation
//     .replace(/seat belt/g, "seatbelt") // Optional: Handle known variations
//     .replace(/\s+/g, " ") // Normalize spaces
//     .trim();
// }

// function areSentencesSimilar(spoken, target) {
//   const spokenWords = normalizeSentence(spoken).split(" ");
//   const targetWords = normalizeSentence(target).split(" ");

//   // Optional: Allow flexible match
//   if (spokenWords.length !== targetWords.length) return false;

//   return spokenWords.every((word, i) => word === targetWords[i]);
// }

// // GET: Return a random sentence
// export async function GET() {
//   const randomSentence =
//     sentences[Math.floor(Math.random() * sentences.length)];
//   return NextResponse.json({ sentence: randomSentence });
// }

// // POST: Register passenger
// export async function POST(req) {
//   await connectDB();
//   const data = await req.json();

//   const { name, email, age, gender, password, spokenSentence, targetSentence } =
//     data;

//   if (
//     !name ||
//     !email ||
//     !age ||
//     !gender ||
//     !password ||
//     !spokenSentence ||
//     !targetSentence
//   ) {
//     return NextResponse.json(
//       { error: "All fields are required." },
//       { status: 400 }
//     );
//   }

//   // Check if spoken sentence matches expected sentence
//   if (!areSentencesSimilar(spokenSentence, targetSentence)) {
//     return NextResponse.json(
//       { error: "Spoken sentence does not match." },
//       { status: 400 }
//     );
//   }

//   const passenger = new Passenger({
//     name,
//     email,
//     age,
//     gender,
//     password,
//     spokenSentence,
//     targetSentence,
//   });

//   await passenger.save();

//   return NextResponse.json({ message: "Passenger registered successfully." });
// }

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import Passenger from "@/model/Passenger";

// Helper to normalize sentence: lowercased, trimmed, no punctuation
const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[.,!?]/g, "") // remove punctuation
    .replace(/\s+/g, "") // remove all spaces
    .trim();

export async function GET() {
  const sentences = [
    "Please fasten your seatbelt securely.",
    "Airplanes are safe and fast.",
    "Keep your boarding pass ready.",
    "Do not leave your luggage unattended.",
    "Cabin crew will assist you shortly.",
  ];
  const random = sentences[Math.floor(Math.random() * sentences.length)];
  return NextResponse.json({ sentence: random });
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const {
      name,
      email,
      age,
      gender,
      password,
      spokenSentence,
      targetSentence,
    } = body;

    console.log("Received password in request body:", password);

    if (
      !name ||
      !email ||
      !age ||
      !gender ||
      !password ||
      !spokenSentence ||
      !targetSentence
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const existing = await Passenger.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Passenger already registered." },
        { status: 400 }
      );
    }

    if (normalize(spokenSentence) !== normalize(targetSentence)) {
      return NextResponse.json(
        { error: "Spoken sentence does not match." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const passenger = new Passenger({
      name,
      email,
      age,
      gender,
      password: hashedPassword,
      spokenSentence,
      targetSentence,
    });

    console.log("Passenger to be saved:", passenger);

    await passenger.save();

    return NextResponse.json({ message: "Passenger registered successfully." });
  } catch (err) {
    console.error("Passenger registration error:", err);
    return NextResponse.json(
      { error: "Internal Server Error." },
      { status: 500 }
    );
  }
}
