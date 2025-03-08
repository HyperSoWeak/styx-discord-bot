import GuildSettings from '../models/GuildSettings.ts';

export async function getGuildSettings(guildId: string) {
  const guildSettings = await GuildSettings.findOneAndUpdate({ guildId }, { guildId }, { new: true, upsert: true });
  return guildSettings;
}

const emojis: { [key: string]: { id: string; testId: string } } = {
  pofang_bronze: {
    id: '',
    testId: '1348001652828798998',
  },
  pofang_silver: {
    id: '',
    testId: '1348001707958861894',
  },
  pofang_gold: {
    id: '',
    testId: '1348001718557741058',
  },
  pofang_diamond: {
    id: '',
    testId: '1348001725818208336',
  },
};

export function getEmoji(client: any, name: string) {
  return `<:${name}:${client.isTest ? emojis[name].testId : emojis[name].id}>`;
}
