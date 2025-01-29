import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.js';

export const data = new SlashCommandBuilder().setName('skip').setDescription('Skip the current song.');

export async function execute(interaction) {
  musicManager.skip(interaction);
}
