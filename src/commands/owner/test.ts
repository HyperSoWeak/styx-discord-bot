import { SlashCommandBuilder, MessageFlags, ChatInputCommandInteraction } from 'discord.js';
import type { Command } from '../../types/command.ts';

class TestCommand implements Command {
  ownerOnly = true;
  data = new SlashCommandBuilder().setName('test').setDescription('For testing purposes.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply({ content: "I'm working!", flags: MessageFlags.Ephemeral });
  }
}

export default new TestCommand();
