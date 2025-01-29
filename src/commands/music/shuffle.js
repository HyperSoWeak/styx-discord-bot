import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.js';

export const data = new SlashCommandBuilder().setName('shuffle').setDescription('Shuffle the music queue.');

export async function execute(interaction) {
  musicManager.shuffle(interaction);
}
