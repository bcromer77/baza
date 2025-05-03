import mongoose, { Document, Schema } from 'mongoose';

export interface ICreatorAccount extends Document {
  user_id: string;
  account_id: string;
  work_platform_id: string;
  connected_at: Date;
  status: string;
}

const CreatorAccountSchema = new Schema<ICreatorAccount>({
  user_id: { type: String, required: true },
  account_id: { type: String, required: true },
  work_platform_id: { type: String, required: true },
  connected_at: { type: Date, required: true },
  status: { type: String, required: true },
});

export default mongoose.models.CreatorAccount ||
  mongoose.model<ICreatorAccount>('CreatorAccount', CreatorAccountSchema);

