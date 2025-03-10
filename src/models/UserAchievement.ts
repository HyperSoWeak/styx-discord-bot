import { Schema, model, Document } from 'mongoose';

interface IAchievement {
  id: number;
  grantTime: Date;
}

interface IUserAchievement extends Document {
  userId: string;
  achievements: IAchievement[];
}

const AchievementSchema = new Schema<IAchievement>({
  id: { type: Number, required: true },
  grantTime: { type: Date, required: true },
});

const UserAchievementSchema = new Schema<IUserAchievement>({
  userId: { type: String, required: true, unique: true },
  achievements: { type: [AchievementSchema], default: [] },
});

const UserAchievement = model<IUserAchievement>('UserAchievement', UserAchievementSchema);

export default UserAchievement;
