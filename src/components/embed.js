import { EmbedBuilder } from 'discord.js';

export function createEmbed(interaction) {
  return new EmbedBuilder()
    .setColor('#0099ff')
    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
    .setTimestamp();
}

export default createEmbed;
