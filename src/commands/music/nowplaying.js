import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.js';

export const data = new SlashCommandBuilder()
  .setName('nowplaying')
  .setDescription('Display the currently playing song.');

export async function execute(interaction) {
  musicManager.nowPlaying(interaction);
}
