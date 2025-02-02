import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('shuffle').setDescription('Shuffle the music queue.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    musicManager.shuffle(interaction);
  }
}

export default new ImplementedCommand();
