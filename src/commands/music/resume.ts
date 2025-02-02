import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';

export const data = new SlashCommandBuilder().setName('resume').setDescription('Resume the paused song.');

export async function execute(interaction: any) {
  musicManager.resume(interaction);
}
