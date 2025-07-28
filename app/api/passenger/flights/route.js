// import { NextResponse } from "next/server";
// import connectDB from "@/lib/db";
// import Flight from "@/model/Flight";
// import jwt from "jsonwebtoken";

// const JWT_SECRET =
//   process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

// export async function GET(req) {
//   await connectDB();

//   try {
//     const token = req.cookies.get("token")?.value;
//     console.log("Token received:", token ? "Present" : "Missing"); // Debug log
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized: No token found" },
//         { status: 401 }
//       );
//     }

//     const decoded = jwt.verify(token, JWT_SECRET);
//     console.log("Decoded token:", decoded); // Debug log
//     if (decoded.role !== "passenger") {
//       return NextResponse.json(
//         { error: "Forbidden: Not a passenger" },
//         { status: 403 }
//       );
//     }

//     const flights = await Flight.find({}).select(
//       "_id airline logo from to time price type"
//     );
//     console.log("Fetched flights count:", flights.length); // Debug log
//     return NextResponse.json({ flights });
//   } catch (error) {
//     console.error("Error fetching flights:", error.message);
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Flight from "@/model/Flight";
import Passenger from "@/model/Passenger";
import Airline from "@/model/Airline";
import Gate from "@/model/Gate";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "aerovisionaerovisionaerovisonproject";

export async function GET(req) {
  await connectDB();

  try {
    const token = req.cookies.get("token")?.value;
    console.log("Token received:", token ? "Present" : "Missing");
    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("Decoded token:", decoded);
    if (decoded.role !== "passenger") {
      return NextResponse.json(
        { error: "Forbidden: Not a passenger" },
        { status: 403 }
      );
    }

    const passenger = await Passenger.findById(decoded.id);
    if (!passenger) {
      console.log("Passenger not found for id:", decoded.id);
      return NextResponse.json(
        { error: "Passenger not found" },
        { status: 404 }
      );
    }

    const flights = await Flight.find()
      .populate("airline", "name logo")
      .populate("gate", "gateNumber")
      .select(
        "flightNumber from to departure status type price baggageAllowance"
      );
    console.log("Fetched flights:", JSON.stringify(flights, null, 2));
    return NextResponse.json({ flights });
  } catch (error) {
    console.error("Error fetching flights:", error.message);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
