import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.js';

export const data = new SlashCommandBuilder().setName('resume').setDescription('Resume the paused song.');

export async function execute(interaction) {
  musicManager.resume(interaction);
}
