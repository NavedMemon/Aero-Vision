// import mongoose from "mongoose";

// const announcementSchema = new mongoose.Schema({
//   audience: {
//     type: String,
//     required: true,
//     enum: ["All", "Staff", "Passenger"],
//   },
//   department: { type: String, default: null },
//   flight: { type: String, default: null },
//   text: { type: String, required: true },
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admin",
//     required: true,
//   },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.models.Announcement ||
//   mongoose.model("Announcement", announcementSchema);

import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  audience: {
    type: String,
    required: true,
    enum: ["All", "Staff", "Passenger"],
  },
  role: { type: String, default: null }, // Changed from department to role
  flight: { type: String, default: null },
  text: { type: String, required: true, trim: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema, "announcements");
