import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.js';

export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Play a song or playlist.')
  .addStringOption((option) => option.setName('query').setDescription('Song or URL to play').setRequired(true));

export async function execute(interaction) {
  musicManager.play(interaction);
}
