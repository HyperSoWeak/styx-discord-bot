export type AchievementCondition =
  | { type: 'stat_threshold'; statKey: string; threshold: number }
  | { type: 'custom'; handler: (userId: string, context?: unknown) => Promise<boolean> };

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  emoji: string;
  isHidden?: boolean; // 隱藏成就
  condition: AchievementCondition;
}

/**
 * Helper to define an achievement.
 */
export function defineAchievement(achievement: AchievementDefinition): AchievementDefinition {
  return achievement;
}
