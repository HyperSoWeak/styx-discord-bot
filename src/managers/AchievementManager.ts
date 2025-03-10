import UserAchievement from '../models/UserAchievement.ts';
import achievements from '../data/achievements.ts';
import { Channel, EmbedBuilder } from 'discord.js';

class AchievementManager {
  async grantAchievement(userId: string, identifier: string, channel?: Channel) {
    const userAchievements = await UserAchievement.findOneAndUpdate(
      { userId },
      { userId },
      { new: true, upsert: true }
    );

    const achievement = achievements.find((ach) => ach.identifier === identifier);

    if (!achievement) {
      console.log(`Achievement with identifier: ${identifier} not found`);
      return;
    }

    const achievementId = achievement.id;

    const isAlreadyGranted = userAchievements.achievements.some((a) => a.id === achievementId);

    if (isAlreadyGranted) {
      console.log(`User ${userId} already has the achievement with ID: ${achievementId}`);
      return;
    }

    userAchievements.achievements.push({
      id: achievement.id,
      grantTime: new Date(),
    });

    await userAchievements.save();

    console.log(`User ${userId} unlocked achievement: ${achievement.name}`);

    if (channel?.isSendable()) {
      const achievementText = `🎉 <@${userId}> 已解鎖成就**【${achievement.emoji} ${achievement.name}】**`;
      const achievementEmbed = new EmbedBuilder()
        .setColor('#FFD700')
        .setDescription(achievement.description)
        .setFooter({
          text: `使用 /achievements 查看更多成就`,
        });

      await channel.send({ content: achievementText, embeds: [achievementEmbed] });
    }
  }

  async handlePofang(userId: string, count: number, channel: Channel) {
    if (count == 10) {
      await this.grantAchievement(userId, 'pofang_bronze', channel);
    } else if (count == 30) {
      await this.grantAchievement(userId, 'pofang_silver', channel);
    } else if (count == 100) {
      await this.grantAchievement(userId, 'pofang_gold', channel);
    } else if (count == 300) {
      await this.grantAchievement(userId, 'pofang_diamond', channel);
    }
  }
}

export const achievementManager = new AchievementManager();
