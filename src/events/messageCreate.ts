import { Events, Message } from 'discord.js';
import { getGuildSettings } from '../utils/getter.ts';
import { isDeveloper } from '../utils/checker.ts';
import chalk from 'chalk';
import { RhymeService, RelayService } from '../services/message/TextFeatureService.ts';
import { MessageCountService } from '../services/leveling/MessageCountService.ts';

export const name = Events.MessageCreate;

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

  if (guildSettings.hasRhymeTest) await RhymeService.handle(message);
  if (guildSettings.hasMsgRelay) await RelayService.handle(message);
  if (guildSettings.hasMsgCount) await MessageCountService.handle(message);
}
