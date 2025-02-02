import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('skip').setDescription('Skip the current song.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    musicManager.skip(interaction);
  }
}

export default new ImplementedCommand();
