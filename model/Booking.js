// import mongoose from "mongoose";

// const passengerInfoSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   dob: { type: Date, required: true },
//   gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
//   document: { type: String, required: true }, // Store file path or URL
// });

// const bookingSchema = new mongoose.Schema({
//   flight: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Flight",
//     required: true,
//   },
//   passenger: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Passenger",
//     required: true,
//   },
//   seats: [{ type: String, required: true }], // e.g., ["A1", "A2"]
//   passengers: [passengerInfoSchema], // One per seat
//   totalPrice: { type: Number, required: true, min: 0 },
//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed"],
//     default: "Pending",
//   },
//   paymentIntentId: { type: String },
//   status: {
//     type: String,
//     enum: ["Confirmed", "Cancelled"],
//     default: "Confirmed",
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Booking ||
//   mongoose.model("Booking", bookingSchema, "bookings");

// import mongoose from "mongoose";

// const passengerInfoSchema = new mongoose.Schema({
//   name: { type: String, required: true, trim: true },
//   dob: { type: Date, required: true },
//   gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
//   document: { type: String, required: true }, // Store file path or URL
// });

// const bookingSchema = new mongoose.Schema({
//   flight: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Flight",
//     required: true,
//   },
//   passenger: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Passenger",
//     required: true,
//   },
//   seats: [{ type: String, required: true }], // e.g., ["A1", "A2"]
//   passengers: [passengerInfoSchema], // One per seat
//   totalPrice: { type: Number, required: true, min: 0 },
//   paymentStatus: {
//     type: String,
//     enum: ["Pending", "Completed", "Failed"],
//     default: "Pending",
//   },
//   paymentIntentId: { type: String },
//   status: {
//     type: String,
//     enum: ["Confirmed", "Cancelled"],
//     default: "Confirmed",
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Booking ||
//   mongoose.model("Booking", bookingSchema, "bookings");

import mongoose from "mongoose";

const passengerInfoSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  document: { type: String, required: true }, // Store file path or URL
});

const bookingSchema = new mongoose.Schema({
  flight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
    required: true,
  },
  passenger: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Passenger",
    required: true,
  },
  seats: [{ type: String, required: true }], // e.g., ["A1", "A2"]
  passengers: [passengerInfoSchema], // One per seat
  totalPrice: { type: Number, required: true, min: 0 },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  paymentIntentId: { type: String },
  status: {
    type: String,
    enum: ["Confirmed", "Cancelled"],
    default: "Confirmed",
  },
  flightStatus: {
    type: String,
    enum: ["On Time", "Delayed", "Cancelled"],
    default: "On Time",
  },
  delayTime: { type: Number, default: 0 }, // Delay in hours
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema, "bookings");
