import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('choose')
  .setDescription('Chooses between some provided options.')
  .addStringOption((option) =>
    option.setName('options').setDescription('The options to choose from (separated by space).').setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction): Promise<void> {
  const options = interaction.options.getString('options')?.split(' ') || [];
  const choice = options[Math.floor(Math.random() * options.length)];
  await interaction.reply(choice);
}
