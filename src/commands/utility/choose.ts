import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('choose')
    .setDescription('Chooses between some provided options.')
    .addStringOption((option) =>
      option.setName('options').setDescription('The options to choose from (separated by space).').setRequired(true)
    );

  async execute(interaction: ChatInputCommandInteraction) {
    const options = interaction.options.getString('options')?.split(' ') || [];
    const choice = options[Math.floor(Math.random() * options.length)];
    await interaction.reply(choice);
  }
}

export default new ImplementedCommand();
