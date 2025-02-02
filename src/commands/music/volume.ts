import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';

export const data = new SlashCommandBuilder()
  .setName('volume')
  .setDescription('Adjust the volume of the music.')
  .addIntegerOption((option) => option.setName('level').setDescription('Volume level (0-100)').setRequired(true));

export async function execute(interaction: any) {
  musicManager.volume(interaction);
}
