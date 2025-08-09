// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema({
//   announcementId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Announcement",
//     required: true,
//   },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     refPath: "userModel",
//   },
//   userModel: { type: String, required: true, enum: ["Staff", "Passenger"] },
//   text: { type: String, required: true },
//   read: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// const Notification =
//   mongoose.models.Notification ||
//   mongoose.model("Notification", notificationSchema);
// console.log("Notification model registered:", !!mongoose.models.Notification);
// export default Notification;

// import mongoose from "mongoose";

// const notificationSchema = new mongoose.Schema({
//   announcementId: { type: mongoose.Schema.Types.ObjectId, ref: "Announcement" },
//   taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     refPath: "userModel",
//   },
//   userModel: { type: String, required: true, enum: ["Staff", "Passenger"] },
//   text: { type: String, required: true },
//   read: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// const Notification =
//   mongoose.models.Notification ||
//   mongoose.model("Notification", notificationSchema);
// console.log("Notification model registered:", !!mongoose.models.Notification);
// export default Notification;

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  announcementId: { type: mongoose.Schema.Types.ObjectId, ref: "Announcement" },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "userModel",
  },
  userModel: {
    type: String,
    required: true,
    enum: ["Staff", "Passenger", "Admin"],
  },
  text: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema);
console.log("Notification model registered:", !!mongoose.models.Notification);
export default Notification;
