import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../components/embed.ts';
import type { Command } from '../../types/command.ts';

async function fetchCodeforcesUser(handle: string) {
  const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
  const data = await response.json();

  if (data.status !== 'OK') {
    throw new Error('Failed to fetch Codeforces user data.');
  }

  return data.result[0];
}

function getRatingColor(rating: number) {
  if (rating >= 2600) return '#FF0000';
  if (rating >= 2400) return '#FF6666';
  if (rating >= 2300) return '#FF6666';
  if (rating >= 2100) return '#FFCC88';
  if (rating >= 1900) return '#FFCC88';
  if (rating >= 1600) return '#AAAAFF';
  if (rating >= 1400) return '#77DDBB';
  if (rating >= 1200) return '#77FF77';
  if (rating >= 0) return '#CCCCCC';
  return '#000000';
}

class CodeforcesCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('cf-rating')
    .setDescription("Fetches a user's Codeforces profile, including rating and color.")
    .addStringOption((option) =>
      option.setName('handle').setDescription('The Codeforces handle of the user').setRequired(true)
    );

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const handle = interaction.options.getString('handle') ?? '';

    try {
      const userInfo = await fetchCodeforcesUser(handle);
      const { rating = 'Unrated', rank = 'Unranked', handle: userHandle, maxRating, maxRank } = userInfo;

      const ratingColor = typeof rating === 'number' ? getRatingColor(rating) : '#000000';

      const cfEmbed = createEmbed(interaction)
        .setTitle(`${userHandle}'s Codeforces Profile`)
        .setURL(`https://codeforces.com/profile/${userHandle}`)
        .addFields(
          { name: 'Current Rating', value: `${rating}`, inline: true },
          { name: 'Rank', value: `${rank}`, inline: true },
          { name: 'Max Rating', value: `${maxRating || 'N/A'} (${maxRank || 'N/A'})`, inline: true }
        )
        .setColor(ratingColor);

      await interaction.reply({
        embeds: [cfEmbed],
      });
    } catch {
      await interaction.reply({
        content: `Error: Could not fetch data for the handle \`${handle}\`. Make sure the handle is correct.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}

export default new CodeforcesCommand();
