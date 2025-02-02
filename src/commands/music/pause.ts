import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('pause').setDescription('Pause the current song.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    musicManager.pause(interaction);
  }
}

export default new ImplementedCommand();
