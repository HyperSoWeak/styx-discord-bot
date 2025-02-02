import mongoose, { Document, Schema } from 'mongoose';

export interface IUserInfo extends Document {
  userId: string;
  birthday: Date | null;
}

const userInfoSchema = new Schema<IUserInfo>({
  userId: { type: String, required: true, unique: true },
  birthday: { type: Date, default: null },
});

const UserInfo = mongoose.model<IUserInfo>('UserInfo', userInfoSchema);

export default UserInfo;
