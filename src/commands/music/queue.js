import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.js';

export const data = new SlashCommandBuilder().setName('queue').setDescription('Display the current music queue.');

export async function execute(interaction) {
  musicManager.queue(interaction);
}
