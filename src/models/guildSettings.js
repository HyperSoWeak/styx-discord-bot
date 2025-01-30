import mongoose from 'mongoose';

const guildSettingsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  hasMsgCount: { type: Boolean, default: true },
  hasMsgRelay: { type: Boolean, default: true },
});

const GuildSettings = mongoose.model('GuildSettings', guildSettingsSchema);

export default GuildSettings;
