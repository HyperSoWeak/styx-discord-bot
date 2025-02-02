import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('stop').setDescription('Stop the music and leave the voice channel.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    musicManager.stop(interaction);
  }
}

export default new ImplementedCommand();
