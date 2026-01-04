import { Message } from 'discord.js';
import msgCountList from '../../data/msgCount.ts';
import { statsService } from '../stats/StatsService.ts';

export const MessageCountService = {
  async handle(message: Message) {
    for (const { keywords, responses, counter } of msgCountList) {
      if (keywords.some((keyword) => message.content.includes(keyword))) {
        try {
          // Increment stat (handles DB update and Achievement check)
          await statsService.increment(message.author.id, counter, 1, { channel: message.channel });

          // Retrieve updated count for response (optional, or statsService could return it)
          // For simplicity in this refactor, we are fetching it again or we could make increment return it.
          // Let's modify StatsService slightly or just query for response generation.

          // Actually, msgCountList logic requires the count for the response text.
          // Let's assume we can get it from a quick DB fetch or pass it from statsService.
          // To keep it robust, let's fetch.

          // But wait, to be efficient, statsService should probably return the new value.
          // Let's rely on statsService logic, but for now to minimize changes in `responses` logic:

          // Temporary direct fetch to maintain response format
          const MsgCount = (await import('../../models/MsgCount.ts')).default;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const userMsgCount = await MsgCount.findOne({ userId: message.author.id });

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const response = responses(message, userMsgCount as any, counter);
          await message.reply(response);
        } catch (err) {
          console.error('Error while updating user count:', err);
        }
      }
    }
  },
};
