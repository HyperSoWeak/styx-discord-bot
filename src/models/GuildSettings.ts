import mongoose, { Document, Schema } from 'mongoose';

export interface IGuildSettings extends Document {
  guildId: string;
  hasMsgCount: boolean;
  hasMsgRelay: boolean;
  hasRhymeTest: boolean;
  hasBirthdayCelebration: boolean;
  timezone: string;
  announcementChannel: string | null;
}

const guildSettingsSchema = new Schema<IGuildSettings>({
  guildId: { type: String, required: true, unique: true },
  hasMsgCount: { type: Boolean, default: true },
  hasMsgRelay: { type: Boolean, default: true },
  hasRhymeTest: { type: Boolean, default: true },
  hasBirthdayCelebration: { type: Boolean, default: true },
  timezone: { type: String, default: 'UTC' },
  announcementChannel: { type: String, default: null },
});

const GuildSettings = mongoose.model<IGuildSettings>('GuildSettings', guildSettingsSchema);

export default GuildSettings;
