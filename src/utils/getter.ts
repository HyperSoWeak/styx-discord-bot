import GuildSettings from '../models/GuildSettings.ts';

export async function getGuildSettings(guildId: string) {
  const guildSettings = await GuildSettings.findOneAndUpdate({ guildId }, { guildId }, { new: true, upsert: true });
  return guildSettings;
}
