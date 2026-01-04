import { achievementService } from '../services/achievement/AchievementService.ts';
import { pofangAchievements } from '../data/achievements/pofang.ts';
import chalk from 'chalk';

export async function loadAchievements() {
  const allAchievements = [
    ...pofangAchievements,
    // ... future achievements
  ];

  for (const achievement of allAchievements) {
    achievementService.register(achievement);
  }

  console.log(chalk.green(`[Achievements] Loaded ${allAchievements.length} achievements.`));
}
