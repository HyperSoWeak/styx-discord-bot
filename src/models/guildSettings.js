import mongoose from 'mongoose';

const guildSettingsSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  hasMsgCount: { type: Boolean, default: false },
});

const GuildSettings = mongoose.model('GuildSettings', guildSettingsSchema);

export default GuildSettings;
