import mongoose from "mongoose";

const taskHistorySchema = new mongoose.Schema({
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  description: { type: String, required: true },
  staffId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Staff",
    required: true,
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  status: {
    type: String,
    enum: ["Assigned", "Started", "Completed"],
    default: "Assigned",
  },
  assignedAt: { type: Date, default: Date.now },
  startedAt: { type: Date },
  completedAt: { type: Date },
});

const TaskHistory =
  mongoose.models.TaskHistory ||
  mongoose.model("TaskHistory", taskHistorySchema);
export default TaskHistory;
