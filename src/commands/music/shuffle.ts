import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';

export const data = new SlashCommandBuilder().setName('shuffle').setDescription('Shuffle the music queue.');

export async function execute(interaction: any) {
  musicManager.shuffle(interaction);
}
