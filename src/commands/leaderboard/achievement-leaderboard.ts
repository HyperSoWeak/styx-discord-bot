import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../components/embed.ts';
import type { Command } from '../../types/command.ts';
import UserAchievement from '../../models/UserAchievement.ts';

async function getAchievementLeaderboard(): Promise<string> {
  try {
    const allUsers = await UserAchievement.find({});

    if (!allUsers || allUsers.length === 0) {
      return 'No achievements found for any users.';
    }

    const sortedUsers = allUsers
      .filter((user) => user.achievements.length > 0)
      .sort((a, b) => b.achievements.length - a.achievements.length)
      .slice(0, 10);

    const leaderboard = sortedUsers
      .map((user, index) => {
        const position = index + 1;
        const achievementCount = user.achievements.length;
        return `**#${position}** <@${user.userId}> - **${achievementCount}** achievements`;
      })
      .join('\n');

    return leaderboard;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return 'An error occurred while fetching the leaderboard.';
  }
}

class AchievementLeaderboardCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('achievement-leaderboard')
    .setDescription('Displays the global achievement leaderboard.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const leaderboard = await getAchievementLeaderboard();

    const leaderboardEmbed = createEmbed(interaction)
      .setTitle('🏆 Achievement Leaderboard')
      .setDescription(leaderboard);

    await interaction.reply({
      embeds: [leaderboardEmbed],
    });
  }
}

export default new AchievementLeaderboardCommand();
