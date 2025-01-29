import { SlashCommandBuilder } from 'discord.js';
import musicManager from '../../managers/musicManager.js';

export const data = new SlashCommandBuilder().setName('pause').setDescription('Pause the current song.');

export async function execute(interaction) {
  musicManager.pause(interaction);
}
