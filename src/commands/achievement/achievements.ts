import { ChatInputCommandInteraction, SlashCommandBuilder, User } from 'discord.js';
import { createEmbed } from '../../components/embed.ts';
import type { Command } from '../../types/command.ts';
import UserAchievement from '../../models/UserAchievement.ts';
import { getFormattedDate } from '../../utils/time.ts';
import achievements, { Achievement } from '../../data/achievements.ts';

async function getUserAchievements(userId: string): Promise<string> {
  try {
    const userAchievements = await UserAchievement.findOne({ userId });

    if (!userAchievements || userAchievements.achievements.length === 0) {
      return 'No achievements found for this user.';
    }

    const description = userAchievements.achievements
      .map((achievement) => {
        const achievementDate = getFormattedDate(achievement.grantTime);
        const achievementData = achievements.find((a) => a.id === achievement.id) as Achievement;
        return (
          `**${achievementData.emoji} ${achievementData.name}**\n` +
          `> 📅 **獲得於** ${achievementDate}\n` +
          `> ✨ *${achievementData.description}*\n`
        );
      })
      .join('\n');

    return description;
  } catch (error) {
    console.error('Error fetching achievements:', error);
    return 'An error occurred while fetching achievements.';
  }
}

class AchievementsCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('achievements')
    .setDescription("Displays a user's achievements.")
    .addUserOption((option) =>
      option.setName('user').setDescription('The user to display achievements for (leave empty for yourself)')
    );

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const targetUser = interaction.options.getUser('user') || interaction.user;

    const description = await getUserAchievements(targetUser.id);

    const achievementsEmbed = createEmbed(interaction)
      .setTitle(`${targetUser.username}'s Achievements`)
      .setDescription(description);

    await interaction.reply({
      embeds: [achievementsEmbed],
    });
  }
}

export default new AchievementsCommand();
