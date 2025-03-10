import { getEmoji } from '../utils/getter';

export interface Achievement {
  id: number;
  identifier: string;
  name: string;
  description: string;
  emoji: string;
}

const achievements: Achievement[] = [
  {
    id: 1,
    identifier: 'pofang_diamond',
    name: '破防至尊·鑽石',
    description: '累積破防 300 次，達到破防之巔！',
    emoji: getEmoji('pofang_diamond'),
  },
  {
    id: 2,
    identifier: 'pofang_gold',
    name: '破防王者·金',
    description: '累積破防 100 次，成為破防的霸主！',
    emoji: getEmoji('pofang_gold'),
  },
  {
    id: 3,
    identifier: 'pofang_silver',
    name: '破防勇者·銀',
    description: '累積破防 30 次，展現破防的決心！',
    emoji: getEmoji('pofang_silver'),
  },
  {
    id: 4,
    identifier: 'pofang_bronze',
    name: '破防新星·銅',
    description: '累積破防 10 次，踏上破防之路的第一步！',
    emoji: getEmoji('pofang_bronze'),
  },
];

export default achievements;
