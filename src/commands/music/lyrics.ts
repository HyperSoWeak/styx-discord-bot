import { SlashCommandBuilder } from 'discord.js';
import Genius from 'genius-lyrics';

const genius = new Genius.Client();

export const data = new SlashCommandBuilder()
  .setName('lyrics')
  .setDescription('Get lyrics of the given song.')
  .addStringOption((option) => option.setName('name').setDescription('Song name').setRequired(true));

export async function execute(interaction: any) {
  interaction.deferReply();

  const songName = interaction.options.getString('name');
  const searches = await genius.songs.search(songName);

  const firstSong = searches[0];
  const lyrics = await firstSong.lyrics();

  await interaction.editReply(`## ${firstSong.fullTitle}\n\n${lyrics}`);
}
