import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';

export const data = new SlashCommandBuilder().setName('skip').setDescription('Skip the current song.');

export async function execute(interaction: any) {
  musicManager.skip(interaction);
}
