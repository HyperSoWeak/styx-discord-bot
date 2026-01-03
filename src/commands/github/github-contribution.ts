import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import fetch from 'node-fetch';
import sharp from 'sharp';
import { Command } from '../../types/command.ts';
import { createInfoEmbed } from '../../components/embed.ts';

class GithubContributionCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('github-contribution')
    .setDescription('Get the GitHub contribution graph for a user.')
    .addStringOption((option) =>
      option
        .setName('username')
        .setDescription('The GitHub username to get the contribution graph for.')
        .setRequired(true)
    );

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.deferReply();

    const username = interaction.options.getString('username');
    const url = `https://ghchart.rshah.org/${username}`;

    try {
      const response = await fetch(url);
      const svgContent = await response.text();

      if (!response.ok) {
        throw new Error('Failed to fetch contribution graph.');
      }

      const image = sharp(Buffer.from(svgContent));
      const { width, height } = await image.metadata();
      const padding = 20;

      const pngBuffer = await image
        .resize({
          width: width ? width * 2 : undefined,
          height: height ? height * 2 : undefined,
        })
        .flatten({ background: { r: 32, g: 32, b: 32 } })
        .extend({
          top: padding,
          bottom: padding,
          left: padding,
          right: padding,
          background: { r: 32, g: 32, b: 32, alpha: 1 },
        })
        .png()
        .toBuffer();

      const attachment = {
        files: [
          {
            attachment: pngBuffer,
            name: `${username}_contributions.png`,
          },
        ],
      };

      await interaction.editReply({
        content: `Here is the contribution graph for **${username}**:`,
        ...attachment,
      });
    } catch (error) {
      console.error('Error fetching contribution graph:', error);
      await interaction.editReply({
        embeds: [createInfoEmbed(interaction, 'error', `Failed to fetch the contribution graph for **${username}**.`)],
      });
    }
  }
}

export default new GithubContributionCommand();
