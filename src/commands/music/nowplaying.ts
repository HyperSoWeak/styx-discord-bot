import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('nowplaying').setDescription('Display the currently playing song.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    musicManager.nowPlaying(interaction);
  }
}

export default new ImplementedCommand();
