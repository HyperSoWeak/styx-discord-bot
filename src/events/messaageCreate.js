import { Events } from 'discord.js';
import MsgCount from '../models/msgCount.js';
import { getGuildSettings } from '../utils/getter.js';

export const name = Events.MessageCreate;

export async function execute(message) {
  if (message.author.bot) return;

  const guildSettings = await getGuildSettings(message.guild.id);

  if (guildSettings.hasMsgCount) {
    if (message.content.includes('破防') || message.content.includes('破大防')) {
      try {
        let userMsgCount = await MsgCount.findOne({ userId: message.author.id });

        if (!userMsgCount) {
          userMsgCount = new MsgCount({ userId: message.author.id, pofangCount: 1 });
          await userMsgCount.save();
        } else {
          userMsgCount.pofangCount++;
          await userMsgCount.save();
        }

        await message.reply(`${message.author.username}，你已經破防 ${userMsgCount.pofangCount} 次了 QwQ`);
      } catch (err) {
        console.error('Error while updating user count:', err);
      }
    }
  }
}
