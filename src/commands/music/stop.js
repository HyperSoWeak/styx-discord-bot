import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.js';

export const data = new SlashCommandBuilder()
  .setName('stop')
  .setDescription('Stop the music and leave the voice channel.');

export async function execute(interaction) {
  musicManager.stop(interaction);
}
