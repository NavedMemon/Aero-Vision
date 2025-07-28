// models/LoginHistory.js
import mongoose from "mongoose";

const LoginHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "role",
  },
  role: {
    type: String,
    enum: ["admin", "staff", "passenger"],
    required: true,
  },
  action: {
    type: String,
    enum: ["login", "logout"],
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.LoginHistory ||
  mongoose.model("LoginHistory", LoginHistorySchema);
