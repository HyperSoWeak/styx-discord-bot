import { SlashCommandBuilder, MessageFlags, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('say')
  .setDescription('Say something as the bot.')
  .addStringOption((option) => option.setName('content').setDescription('The content to say.').setRequired(true));
export const ownerOnly = true;

export async function execute(interaction: ChatInputCommandInteraction) {
  const content = interaction.options.getString('content') || '';

  if (!interaction.channel?.isSendable()) {
    await interaction.reply({
      content: 'I cannot send messages in this channel.',
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  interaction.channel.send(content);

  await interaction.reply({
    content: 'Message sent!',
    flags: MessageFlags.Ephemeral,
  });

  await interaction.deleteReply();
}
