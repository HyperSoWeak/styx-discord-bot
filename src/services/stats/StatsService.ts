import { achievementService } from '../achievement/AchievementService.ts';
import MsgCount from '../../models/MsgCount.ts'; // We might want to unify DB models later

class StatsService {
  /**
   * Increment a stat for a user.
   * This handles both DB update and Achievement triggering.
   */
  async increment(userId: string, statKey: string, amount = 1, context?: { channel?: unknown }) {
    // 1. Update Database
    // Ideally, we have a generic 'UserStats' model.
    // For now, we will map specific keys to existing models (MsgCount) or create a new one.
    // To support the existing 'pofangCount', let's stick to a simple mapping or refactor MsgCount later.

    // For this implementation, let's assume we want to support 'pofangCount' using the existing model
    // and generic stats using a new logic (or just mocking it for now to show the pattern).

    let newValue = 0;

    // Mapping legacy counters to DB
    if (['pofangCount', 'haoshuangCount'].includes(statKey)) {
      let userMsgCount = await MsgCount.findOne({ userId });
      if (!userMsgCount) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        userMsgCount = new MsgCount({ userId, [statKey]: amount });
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        userMsgCount[statKey] += amount;
      }
      await userMsgCount.save();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newValue = userMsgCount[statKey];
    } else {
      // Here we would have a generic Stats model.
      // const stats = await UserStats.findOneAndUpdate({ userId }, { $inc: { [statKey]: amount } }, { new: true, upsert: true });
      // newValue = stats[statKey];
      // console.log(`[Stats] Generic stat ${statKey} incremented for ${userId}`);
      return; // Not supporting other stats yet without model
    }

    // 2. Trigger Achievement Check
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await achievementService.checkAchievements(userId, statKey, newValue, context as any);
  }
}

export const statsService = new StatsService();
