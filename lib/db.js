// // lib/db.js
// import mongoose from "mongoose";

// const connectDB = async () => {
//   if (mongoose.connections[0].readyState) {
//     return; // Already connected
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB connected");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDB;

// lib/dbConnect.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define the MONGODB_URI in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
