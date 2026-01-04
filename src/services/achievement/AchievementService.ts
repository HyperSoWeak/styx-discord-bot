import { EventEmitter } from 'events';
import { AchievementDefinition } from '../../types/achievement.ts';
import UserAchievement from '../../models/UserAchievement.ts';
import { TextChannel } from 'discord.js';

class AchievementService extends EventEmitter {
  private achievements = new Map<string, AchievementDefinition>();

  /**
   * Register an achievement definition.
   */
  register(achievement: AchievementDefinition) {
    this.achievements.set(achievement.id, achievement);
  }

  /**
   * Get all registered achievements.
   */
  getAll() {
    return Array.from(this.achievements.values());
  }

  /**
   * Check if a user meets the criteria for specific stats and grant achievements if so.
   * @param userId The user ID.
   * @param statKey The stat that changed.
   * @param currentValue The new value of the stat.
   * @param context Additional context (e.g., channel) for notification.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async checkAchievements(userId: string, statKey: string, currentValue: number, context?: { channel?: any }) {
    for (const achievement of this.achievements.values()) {
      // Only check threshold type achievements here
      if (achievement.condition.type === 'stat_threshold' && achievement.condition.statKey === statKey) {
        if (currentValue >= achievement.condition.threshold) {
          await this.grant(userId, achievement.id, context?.channel);
        }
      }
    }
  }

  /**
   * Grant an achievement to a user.
   */
  async grant(userId: string, achievementId: string, channel?: TextChannel) {
    const achievement = this.achievements.get(achievementId);
    if (!achievement) return;

    // Check if user already has it
    let userRecord = await UserAchievement.findOne({ userId });
    if (!userRecord) {
      userRecord = new UserAchievement({ userId, achievements: [] });
    }

    if (userRecord.achievements.some((a) => a.id === achievementId)) {
      return; // Already has it
    }

    // Grant it
    userRecord.achievements.push({ id: achievementId, grantTime: new Date() });
    await userRecord.save();

    // Send notification
    if (channel && channel.isSendable()) {
      await channel.send({
        content: `<@${userId}> just unlocked an achievement!`,
        embeds: [
          {
            title: '🏆 Achievement Unlocked!',
            description: `**${achievement.emoji} ${achievement.name}**\n${achievement.description}`,
            color: 0xffd700,
            thumbnail: { url: 'https://media.giphy.com/media/Q81NcsY6YxK7jxnr4v/giphy.gif' }, // Optional shiny gif
          },
        ],
      });
    }

    console.log(`[Achievement] Granted ${achievement.name} (${achievement.id}) to ${userId}`);
  }
}
export const achievementService = new AchievementService();
