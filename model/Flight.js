import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  flightNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  airline: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airline",
    required: true,
  },
  from: {
    type: String,
    required: true,
    trim: true,
  },
  to: {
    type: String,
    required: true,
    trim: true,
  },
  departure: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["On Time", "Delayed", "Cancelled"],
    default: "On Time",
  },
  type: {
    type: String,
    enum: ["Domestic", "International"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  baggageAllowance: {
    type: String,
    required: true,
    trim: true,
  },
  gate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gate",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Flight ||
  mongoose.model("Flight", flightSchema, "flights");
