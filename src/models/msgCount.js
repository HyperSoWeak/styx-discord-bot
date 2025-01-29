import mongoose from 'mongoose';

const msgCountSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  pofangCount: { type: Number, default: 0 },
});

const MsgCount = mongoose.model('MsgCount', msgCountSchema);

export default MsgCount;
