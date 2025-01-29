import { SlashCommandBuilder, MessageFlags } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('say')
  .setDescription('Say something as the bot.')
  .addStringOption((option) => option.setName('content').setDescription('The content to say.').setRequired(true));
export const ownerOnly = true;

export async function execute(interaction) {
  const content = interaction.options.getString('content');

  await interaction.channel.send(content);

  await interaction.reply({
    content,
    flags: MessageFlags.Ephemeral,
  });

  await interaction.deleteReply();
}
