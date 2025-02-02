import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';

export const data = new SlashCommandBuilder()
  .setName('nowplaying')
  .setDescription('Display the currently playing song.');

export async function execute(interaction: any) {
  musicManager.nowPlaying(interaction);
}
