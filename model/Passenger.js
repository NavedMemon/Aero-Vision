import mongoose from "mongoose";

const PassengerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    password: { type: String, required: true },
    spokenSentence: { type: String, required: true },
    targetSentence: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Passenger ||
  mongoose.model("Passenger", PassengerSchema);
