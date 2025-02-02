import { EmbedBuilder, CommandInteraction, MessageFlags } from 'discord.js';

export function createEmbed(interaction: CommandInteraction, footer: string | null = null): EmbedBuilder {
  return new EmbedBuilder()
    .setColor('#0099ff')
    .setFooter({
      text: `${footer ? `${footer} • ` : ''}Requested by ${interaction.user.username}`,
      iconURL: interaction.user.displayAvatarURL(),
    })
    .setTimestamp();
}

export function createInfoEmbed(
  interaction: CommandInteraction,
  type: 'warning' | 'error' | 'success' | 'info',
  message: string
): EmbedBuilder {
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
    case 'info':
      return createEmbed(interaction).setTitle(':information_source: Info').setColor('#0099ff').setDescription(message);
  }
}

export async function replyInfoEmbed(
  interaction: CommandInteraction,
  type: 'warning' | 'error' | 'success' | 'info',
  message: string,
  ephemeral: Boolean = false
) {
  await interaction.reply({
    embeds: [createInfoEmbed(interaction, type, message)],
    flags: ephemeral ? MessageFlags.Ephemeral : undefined,
  });
}
