import { Events } from 'discord.js';
import MsgCount from '../models/msgCount.js';
import { getGuildSettings } from '../utils/getter.js';
import msgCountList from '../data/msgCount.js';

export const name = Events.MessageCreate;

export async function execute(message) {
  if (message.author.bot) return;

  const guildSettings = await getGuildSettings(message.guild.id);

  // message count feature
  if (guildSettings.hasMsgCount) {
    for (const { keywords, responses, counter } of msgCountList) {
      if (keywords.some((keyword) => message.content.includes(keyword))) {
        try {
          let userMsgCount = await MsgCount.findOne({ userId: message.author.id });

          if (!userMsgCount) {
            userMsgCount = new MsgCount({ userId: message.author.id, [counter]: 1 });
            await userMsgCount.save();
          } else {
            userMsgCount[counter]++;
            await userMsgCount.save();
          }

          const response = responses(message, userMsgCount, counter);
          await message.reply(response);
        } catch (err) {
          console.error('Error while updating user count:', err);
        }
      }
    }
  }
}
