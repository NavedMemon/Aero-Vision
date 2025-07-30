// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const leaveSchema = new Schema(
//   {
//     staff: { type: Schema.Types.ObjectId, ref: "Staff", required: true },
//     fromDate: { type: Date, required: true },
//     toDate: { type: Date, required: true },
//     description: { type: String, required: true },
//     status: {
//       type: String,
//       enum: ["Pending", "Accepted", "Rejected"],
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// const Leave = mongoose.model("Leave", leaveSchema);
// module.exports = Leave;

import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Leave = mongoose.models.Leave || mongoose.model("Leave", leaveSchema);

export default Leave;
