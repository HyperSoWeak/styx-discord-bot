import GuildSettings from '../models/GuildSettings.js';

export async function getGuildSettings(guildId) {
  return await GuildSettings.findOneAndUpdate({ guildId }, { guildId }, { new: true, upsert: true });
}
