import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  faceDescriptor: { type: [Number], required: true }, // ✅ FIXED: store as array, not Binary
});

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
