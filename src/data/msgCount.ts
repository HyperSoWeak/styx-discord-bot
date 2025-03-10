import { Message } from 'discord.js';

interface MsgCountEntry {
  name: string;
  keywords: string[];
  responses: (message: Message, userMsgCount: Record<string, number>, counter: string) => string;
  counter: string;
}

const msgCountList: MsgCountEntry[] = [
  {
    name: 'pofang',
    keywords: ['破防', '破大防', '破房', '破大房', '🏚️', '破巨防'],
    responses: function (message: Message, userMsgCount: Record<string, number>, counter: string): string {
      const name = message.author.globalName;
      const count = userMsgCount[counter];
      const responses = [
        `${name}，你已經破防 ${count} 次了，笑死！`,
        `破防第 ${count} 次，${name}，你是破防之神嗎？`,
        `啊啊啊 ${name}，破防次數來到 ${count} 次了，我們一起來慶祝吧！`,
        `${name}，第 ${count} 次破防了，你超可悲！`,
        `又破防了？${name}，這是你第 ${count} 次了，你破防破得比打字還快！`,
        `${name}，破防第 ${count} 次，別再破了，場面都快控制不住了！`,
        `這是第 ${count} 次破防，${name}，難道你每天起床就只想破防？`,
        `破防警報！${name}，這是第 ${count} 次了，你是不是太容易破防了？`,
        `哎呀呀 ${name}，破防達到 ${count} 次啦，你怎麼這麼可悲？`,
      ];
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    },
    counter: 'pofangCount',
  },
  {
    name: 'haoshuang',
    keywords: ['好爽', '爽啦', '爽拉'],
    responses: function (message: Message, userMsgCount: Record<string, number>, counter: string): string {
      const name = message.author.globalName;
      const count = userMsgCount[counter];
      const responses = [
        `${name}，你已經講了 ${count} 次好爽了，嗚嗚嗚嗚好爽喔！`,
        `嗚嗚嗚嗚好爽喔！${name}，你第 ${count} 次覺得好爽了，該收斂點了吧？`,
        `${name}，你都嗚嗚嗚嗚好爽喔 ${count} 次了，給別人留點爽的機會好不好？`,
        `${name}，你已經講了 ${count} 次嗚嗚嗚嗚好爽喔，你是不是有點太爽了？`,
      ];
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    },
    counter: 'haoshuangCount',
  },
];

export default msgCountList;
