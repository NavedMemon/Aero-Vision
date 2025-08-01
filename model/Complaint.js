import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["passenger", "staff"],
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "typeModel",
    required: true,
  },
  typeModel: {
    type: String,
    enum: ["Passenger", "Staff"],
    required: true,
  },
  name: {
    type: String,
    required: function () {
      return this.type === "passenger";
    },
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Technical", "Boarding", "Equipment", "Delay", "Other", ""],
    default: "",
    required: function () {
      return this.type === "staff";
    },
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved", "Cancelled"],
    default: "Pending",
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Complaint ||
  mongoose.model("Complaint", complaintSchema);
