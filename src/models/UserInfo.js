import mongoose from 'mongoose';

const userInfoSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  birthday: { type: Date, default: null },
});

const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo;
