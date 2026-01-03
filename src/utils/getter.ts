import GuildSettings from '../models/GuildSettings.ts';
import { client } from '../index.ts';

export async function getGuildSettings(guildId: string) {
  const guildSettings = await GuildSettings.findOneAndUpdate({ guildId }, { guildId }, { new: true, upsert: true });
  return guildSettings;
}

const emojis: Record<string, { id: string; testId: string }> = {
  pofang_bronze: {
    id: '1348578585488654388',
    testId: '1348001652828798998',
  },
  pofang_silver: {
    id: '1348578628182605824',
    testId: '1348001707958861894',
  },
  pofang_gold: {
    id: '1348578641780543581',
    testId: '1348001718557741058',
  },
  pofang_diamond: {
    id: '1348578656187842572',
    testId: '1348001725818208336',
  },
};

export function getEmoji(name: string) {
  return `<:${name}:${client.isTest ? emojis[name].testId : emojis[name].id}>`;
}
