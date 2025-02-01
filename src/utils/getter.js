import GuildSettings from '../models/GuildSettings.js';

export async function getGuildSettings(guildId) {
  let guildSettings = await GuildSettings.findOne({ guildId });
  if (!guildSettings) guildSettings = new GuildSettings({ guildId });
  return guildSettings;
}
