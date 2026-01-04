import { createEmbed } from '../../components/embed.ts';
import { defineCommand } from '../../utils/command.ts';
import MsgCount from '../../models/MsgCount.ts';

async function getPofangLeaderboard(): Promise<string> {
  try {
    const allUsers = await MsgCount.find({});

    if (!allUsers || allUsers.length === 0) {
      return 'No users with pofang records found.';
    }

    const sortedUsers = allUsers
      .filter((user) => user.pofangCount > 0)
      .sort((a, b) => b.pofangCount - a.pofangCount)
      .slice(0, 10);

    const leaderboard = sortedUsers
      .map((user, index) => {
        const position = index + 1;
        const pofangCount = user.pofangCount;
        return `**#${position}** <@${user.userId}> - 已破防 **${pofangCount}** 次`;
      })
      .join('\n');

    return leaderboard;
  } catch (error) {
    console.error('Error fetching pofang leaderboard:', error);
    return 'An error occurred while fetching the pofang leaderboard.';
  }
}

export default defineCommand({
  name: 'pofang-leaderboard',
  description: 'Displays the global pofang leaderboard.',

  async execute(interaction) {
    const leaderboard = await getPofangLeaderboard();

    const leaderboardEmbed = createEmbed(interaction).setTitle('🔥 Pofang Leaderboard').setDescription(leaderboard);

    await interaction.reply({
      embeds: [leaderboardEmbed],
    });
  },
});
