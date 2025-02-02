import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('volume').setDescription('Adjust the volume of the music.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    musicManager.volume(interaction);
  }
}

export default new ImplementedCommand();
