import mongoose, { Document, Schema, Model } from "mongoose";

export interface ICreator extends Document {
  name: string;
  phylloId?: string;
  region?: string;
  createdAt: Date;
}

const CreatorSchema: Schema = new Schema<ICreator>({
  name: { type: String, required: true },
  phylloId: { type: String },
  region: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Creator: Model<ICreator> = mongoose.models.Creator || mongoose.model<ICreator>("Creator", CreatorSchema);

export default Creator;

