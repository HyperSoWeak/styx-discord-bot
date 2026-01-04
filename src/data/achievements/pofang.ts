import { defineAchievement } from '../../types/achievement.ts';

export const pofangAchievements = [
  defineAchievement({
    id: 'pofang_10',
    name: '破防新手',
    description: '破防次數達到 10 次',
    emoji: '💔',
    condition: {
      type: 'stat_threshold',
      statKey: 'pofangCount',
      threshold: 10,
    },
  }),
  defineAchievement({
    id: 'pofang_100',
    name: '破防大師',
    description: '破防次數達到 100 次',
    emoji: '💥',
    condition: {
      type: 'stat_threshold',
      statKey: 'pofangCount',
      threshold: 100,
    },
  }),
];
