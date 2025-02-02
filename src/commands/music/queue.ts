import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.ts';

export const data = new SlashCommandBuilder().setName('queue').setDescription('Display the current music queue.');

export async function execute(interaction: any) {
  musicManager.queue(interaction);
}
