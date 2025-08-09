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

// import mongoose from "mongoose";

// const staffSchema = new mongoose.Schema({
//   name: String,
//   gender: String,
//   age: Number,
//   role: String,
//   email: { type: String, unique: true },
//   password: String,
//   isBlocked: {
//     type: String,
//     enum: ["Y", "N"],
//     default: "N",
//   },
// });

// staffSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await require("bcryptjs").genSalt(10);
//   this.password = await require("bcryptjs").hash(this.password, salt);
//   next();
// });

// const Staff = mongoose.models.Staff || mongoose.model("Staff", staffSchema);
// export default Staff;
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const staffSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
  role: {
    type: String,
    enum: ["Ground Staff", "Security", "Maintenance", "Other"],
  },
  email: { type: String, unique: true },
  password: String,
  isBlocked: {
    type: String,
    enum: ["Y", "N"],
    default: "N",
  },
  isTeamLeader: {
    type: Boolean,
    default: false,
  },
});

staffSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  if (this.isTeamLeader) {
    // Check if another team leader exists for the same role
    const existingLeader = await mongoose.models.Staff.findOne({
      role: this.role,
      isTeamLeader: true,
      _id: { $ne: this._id }, // Exclude the current document
    });
    if (existingLeader) {
      const error = new Error(`Team leader already exists for ${this.role}`);
      return next(error);
    }
  }
  next();
});

const Staff = mongoose.models.Staff || mongoose.model("Staff", staffSchema);
export default Staff;
