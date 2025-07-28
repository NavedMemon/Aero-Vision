// import mongoose from "mongoose";

// const gateSchema = new mongoose.Schema({
//   gateNumber: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//   },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "admin",
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.models.Gate ||
//   mongoose.model("Gate", gateSchema, "gates");

import mongoose from "mongoose";

const gateSchema = new mongoose.Schema({
  gateNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin", // Fixed from "admin" to "Admin"
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Gate ||
  mongoose.model("Gate", gateSchema, "gates");
