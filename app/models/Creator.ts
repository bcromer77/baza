import mongoose from "mongoose";

const CreatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  persona: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Creator || mongoose.model("Creator", CreatorSchema);

