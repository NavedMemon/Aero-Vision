import mongoose from "mongoose";

const airlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.models.Airline ||
  mongoose.model("Airline", airlineSchema, "airlines");
