import { Message } from 'discord.js';
import rhymeTest from '../../utils/rhymeTest.ts';
import msgRelayList from '../../data/msgRelay.ts';

export const RhymeService = {
  async handle(message: Message) {
    await rhymeTest(message);
  },
};

export const RelayService = {
  async handle(message: Message) {
    for (const { keywords, responses } of msgRelayList) {
      if (keywords.some((keyword) => message.content.includes(keyword))) {
        const response = responses[Math.floor(Math.random() * responses.length)];
        await message.reply(response);
      }
    }
  },
};
