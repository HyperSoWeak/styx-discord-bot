import { Events, Message } from 'discord.js';
import MsgCount from '../models/MsgCount.ts';
import { getGuildSettings } from '../utils/getter.ts';
import msgCountList from '../data/msgCount.ts';
import msgRelayList from '../data/msgRelay.ts';
import rhymeTest from '../utils/rhymeTest.ts';

export const name = Events.MessageCreate;

async function handleRhymeTest(message: Message) {
  await rhymeTest(message);
}

async function handleMsgRelay(message: Message) {
  for (const { keywords, responses } of msgRelayList) {
    if (keywords.some((keyword) => message.content.includes(keyword))) {
      const response = responses[Math.floor(Math.random() * responses.length)];
      await message.reply(response);
    }
  }
}

async function handleMsgCount(message: Message) {
  for (const { keywords, responses, counter } of msgCountList) {
    if (keywords.some((keyword) => message.content.includes(keyword))) {
      try {
        let userMsgCount = (await MsgCount.findOne({ userId: message.author.id })) as any;

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

export async function execute(message: Message) {
  if (message.author.bot) return;

  if (!message.guild) return;
  const guildSettings = await getGuildSettings(message.guild.id);

  if (guildSettings.hasRhymeTest) handleRhymeTest(message);
  if (guildSettings.hasRhymeTest) handleMsgRelay(message);
  if (guildSettings.hasRhymeTest) handleMsgCount(message);
}
