import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  staffIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Staff", required: true },
  ],
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;
