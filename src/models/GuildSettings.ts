import mongoose, { Document, Schema } from 'mongoose';

export interface IGuildSettings extends Document {
  guildId: string;
  hasMsgCount: boolean;
  hasMsgRelay: boolean;
  hasRhymeTest: boolean;
  timezone: string;
}

const guildSettingsSchema = new Schema<IGuildSettings>({
  guildId: { type: String, required: true, unique: true },
  hasMsgCount: { type: Boolean, default: true },
  hasMsgRelay: { type: Boolean, default: true },
  hasRhymeTest: { type: Boolean, default: true },
  timezone: { type: String, default: 'UTC' },
});

const GuildSettings = mongoose.model<IGuildSettings>('GuildSettings', guildSettingsSchema);

export default GuildSettings;
