import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('queue').setDescription('Display the current music queue.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    musicManager.queue(interaction);
  }
}

export default new ImplementedCommand();
