// import mongoose from "mongoose";

// const taskHistorySchema = new mongoose.Schema({
//   taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
//   description: { type: String, required: true },
//   staffId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Staff",
//     required: true,
//   },
//   adminId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admin",
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ["Assigned", "Started", "Completed"],
//     default: "Assigned",
//   },
//   assignedAt: { type: Date, default: Date.now },
//   startedAt: { type: Date },
//   completedAt: { type: Date },
// });

// const TaskHistory =
//   mongoose.models.TaskHistory ||
//   mongoose.model("TaskHistory", taskHistorySchema);
// export default TaskHistory;

// import mongoose from "mongoose";

// const taskHistorySchema = new mongoose.Schema({
//   taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
//   description: { type: String, required: true },
//   staffId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Staff",
//     required: true,
//   },
//   assignedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     refPath: "assignedByModel",
//     required: true,
//   },
//   assignedByModel: {
//     type: String,
//     enum: ["Admin", "Staff"],
//     required: true,
//   },
//   assignedToTeammateAt: { type: Date },
//   assignedByTeamLeader: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
//   status: {
//     type: String,
//     enum: ["Assigned", "Started", "Completed", "Rejected", "Delegated"],
//     default: "Assigned",
//   },
//   assignedAt: { type: Date, default: Date.now },
//   startedAt: { type: Date },
//   completedAt: { type: Date },
//   rejectedAt: { type: Date },
//   rejectionReason: String,
//   rejectionCount: { type: Number, default: 0 },
// });

// const TaskHistory =
//   mongoose.models.TaskHistory ||
//   mongoose.model("TaskHistory", taskHistorySchema);
// export default TaskHistory;

// import mongoose from "mongoose";

// const taskHistorySchema = new mongoose.Schema({
//   taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
//   description: { type: String, required: true },
//   staffId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Staff",
//     required: true,
//   },
//   assignedBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     refPath: "assignedByModel",
//     required: true,
//   },
//   assignedByModel: {
//     type: String,
//     enum: ["Admin", "Staff"],
//     required: true,
//   },
//   assignedToTeammateAt: { type: Date },
//   assignedByTeamLeader: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
//   status: {
//     type: String,
//     enum: ["Assigned", "Started", "Completed", "Rejected", "Delegated"],
//     default: "Assigned",
//   },
//   assignedAt: { type: Date, default: Date.now },
//   startedAt: { type: Date },
//   completedAt: { type: Date },
//   rejectedAt: { type: Date },
//   rejectionReason: String,
//   rejectionCount: { type: Number, default: 0 },
//   acceptedByTeamLeader: { type: Boolean, default: false },
// });

// const TaskHistory =
//   mongoose.models.TaskHistory ||
//   mongoose.model("TaskHistory", taskHistorySchema);
// export default TaskHistory;

import mongoose from "mongoose";

const taskHistorySchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  description: { type: String, required: true },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: "assignedByModel",
    required: true,
  },
  assignedByModel: {
    type: String,
    enum: ["Admin", "Staff"],
    required: true,
  },
  assignedToTeammateAt: { type: Date },
  assignedByTeamLeader: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  status: {
    type: String,
    enum: ["Assigned", "Started", "Completed", "Rejected", "Delegated"],
    default: "Assigned",
  },
  assignedAt: { type: Date, default: Date.now },
  startedAt: { type: Date },
  completedAt: { type: Date },
  rejectedAt: { type: Date },
  rejectionReason: String,
  rejectionCount: { type: Number, default: 0 },
  acceptedByTeamLeader: { type: Boolean, default: false },
  adminAcceptedAt: { type: Date },
  adminRejectedAt: { type: Date },
  adminRejectionCount: { type: Number, default: 0 },
  adminRejectionReason: { type: String },
});

const TaskHistory =
  mongoose.models.TaskHistory ||
  mongoose.model("TaskHistory", taskHistorySchema);
export default TaskHistory;
