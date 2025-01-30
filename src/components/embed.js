import { EmbedBuilder } from 'discord.js';

export function createEmbed(interaction) {
  return new EmbedBuilder()
    .setColor('#0099ff')
    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
    .setTimestamp();
}

export function createInfoEmbed(interaction, type, message) {
  switch (type) {
    case 'warning':
      return createEmbed(interaction).setTitle(':warning: Warning').setColor('#ffcc00').setDescription(message);
    case 'error':
      return createEmbed(interaction).setTitle(':x: Error').setColor('#ff0000').setDescription(message);
    case 'success':
      return createEmbed(interaction)
        .setTitle(':white_check_mark: Success')
        .setColor('#00ff00')
        .setDescription(message);
  }
}
