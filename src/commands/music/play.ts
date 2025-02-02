import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song or playlist.')
    .addStringOption((option) => option.setName('query').setDescription('Song or URL to play').setRequired(true));

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    musicManager.play(interaction);
  }
}

export default new ImplementedCommand();
