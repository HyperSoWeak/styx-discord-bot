import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Genius from 'genius-lyrics';
import type { Command } from '../../types/command.ts';

const genius = new Genius.Client();

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('lyrics')
    .setDescription('Get lyrics of the given song.')
    .addStringOption((option) => option.setName('name').setDescription('Song name').setRequired(true));

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    interaction.deferReply();

    const songName = interaction.options.getString('name') || '';
    const searches = await genius.songs.search(songName);

    const firstSong = searches[0];
    const lyrics = await firstSong.lyrics();

    await interaction.editReply(`## ${firstSong.fullTitle}\n\n${lyrics}`);
  }
}

export default new ImplementedCommand();
