import { Events, Message } from 'discord.js';
import MsgCount from '../models/MsgCount.ts';
import { getGuildSettings } from '../utils/getter.ts';
import { isDeveloper } from '../utils/checker.ts';
import msgCountList from '../data/msgCount.ts';
import msgRelayList from '../data/msgRelay.ts';
import rhymeTest from '../utils/rhymeTest.ts';
import chalk from 'chalk';
import { achievementManager } from '../managers/AchievementManager.ts';

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
  for (const { name, keywords, responses, counter } of msgCountList) {
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

        // handle achievement
        if (name === 'pofang') {
          achievementManager.handlePofang(message.author.id, userMsgCount[counter], message.channel);
        }
      } catch (err) {
        console.error('Error while updating user count:', err);
      }
    }
  }
}

export async function execute(message: Message) {
  if (message.author.bot) return;

  const exitCommand = '!!exit';
  if (message.content === exitCommand && isDeveloper(message.author.id)) {
    await message.reply('Goodbye!');
    console.log(chalk.red('Terminated by developer'));
    process.exit();
  }

  if (!message.guild) return;
  const guildSettings = await getGuildSettings(message.guild.id);

  if (guildSettings.hasRhymeTest) handleRhymeTest(message);
  if (guildSettings.hasMsgRelay) handleMsgRelay(message);
  if (guildSettings.hasMsgCount) handleMsgCount(message);
}
