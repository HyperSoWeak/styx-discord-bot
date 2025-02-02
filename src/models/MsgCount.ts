import mongoose, { Document, Schema } from 'mongoose';

export interface IMsgCount extends Document {
  userId: string;
  pofangCount: number;
  haoshuangCount: number;
}

const msgCountSchema = new Schema<IMsgCount>({
  userId: { type: String, required: true, unique: true },
  pofangCount: { type: Number, default: 0 },
  haoshuangCount: { type: Number, default: 0 },
});

const MsgCount = mongoose.model<IMsgCount>('MsgCount', msgCountSchema);

export default MsgCount;
