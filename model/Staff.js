// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const staffSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   gender: { type: String, required: true },
//   age: { type: Number, required: true },
//   role: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// // Hash password before saving
// staffSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// export default mongoose.models.Staff || mongoose.model("Staff", staffSchema);

import mongoose from "mongoose";

const staffSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  role: String,
  email: { type: String, unique: true },
  password: String,
  isBlocked: {
    type: String,
    enum: ["Y", "N"],
    default: "N",
  },
});

staffSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await require("bcryptjs").genSalt(10);
  this.password = await require("bcryptjs").hash(this.password, salt);
  next();
});

const Staff = mongoose.models.Staff || mongoose.model("Staff", staffSchema);
export default Staff;
