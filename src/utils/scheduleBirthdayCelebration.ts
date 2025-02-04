import { TextChannel, Client } from 'discord.js';
import cron from 'node-cron';
import moment from 'moment-timezone';
import GuildSettings from '../models/GuildSettings.ts';
import UserInfo from '../models/UserInfo.ts';
import chalk from 'chalk';

function scheduleBirthdayCelebration(client: Client) {
  cron.schedule(
    '0 * * * *',
    async () => {
      const guilds = client.guilds.cache;

      for (const guild of guilds.values()) {
        const guildId = guild.id;

        const guildSettings = await GuildSettings.findOne({ guildId });
        if (!guildSettings || !guildSettings.hasBirthdayCelebration || !guildSettings.announcementChannel) continue;

        const timezone = guildSettings.timezone || 'UTC';
        const currentTime = moment().tz(timezone).format('HH:mm');

        if (currentTime !== '00:00') continue;

        const currentDate = moment().tz(timezone).format('MM-DD');

        const usersWithBirthdays = await UserInfo.find({
          birthday: {
            $exists: true,
            $ne: null,
          },
          $expr: {
            $eq: [{ $dateToString: { format: '%m-%d', date: '$birthday', timezone: 'UTC' } }, currentDate],
          },
        });

        for (const user of usersWithBirthdays) {
          const member = await guild.members.fetch(user.userId).catch(() => null);
          if (!member) continue;

          const birthdayChannelId = guildSettings.announcementChannel;
          const channel = guild.channels.cache.get(birthdayChannelId) as TextChannel;

          if (channel) {
            try {
              await sendBirthdayMessage(channel, user.userId);
            } catch (error) {
              console.error('Error sending birthday message:', error);
            }
          }
        }
      }
    },
    {
      timezone: 'UTC',
    }
  );

  console.log(chalk.green('[Client] Scheduled birthday celebration messages'));
}

export default scheduleBirthdayCelebration;

async function sendBirthdayMessage(channel: TextChannel, userId: string) {
  const birthdayMessages = [
    `或許你說的對，但是烏拉圭的人口有345.7萬，同時，僅澳大利亞就有4700萬只袋鼠。如果袋鼠決定入侵烏拉圭，那麽每一個烏拉圭人要打14只袋鼠，你不知道，你不在乎。\n\n✨🎉 **你只在乎今天是 <@${userId}> 的生日！** 來一起為他送上祝福吧！ 🎉✨`,

    `笑死？你為什麼要笑？你憑什麼笑？我就這麼好笑嗎？我累了我累了真的累了，沒有人能懂我，沒人能理解我面具下的脆弱，破防了我真的破防了。你覺得我很可憐是吧，我不需要的你的同情，把你那虛偽的面容藏好，但是我需要的是你的祝福。\n\n🎂🥳 **因為今天是 <@${userId}> 的生日！** 讓我們來一場盛大的慶祝！ 🥳🎂`,

    `我現在在醫院的重症室里，戴著呼吸機，花了眼不離屏幕半分，那清脆的消息回復的聲音再沒有響起。我哭不出來。我知道我沒有多少時間了，生命在煎熬中流逝。終於，倦意襲來，我用盡了最後的力氣打出了幾個字：\n\n🎉🎈 **生日快樂 <@${userId}>！** 祝你有個超棒的一天！ 🎈🎉`,

    `建議您坐飛機到羅馬達芬奇機場，然後坐地鐵a線到Ottaviano San Pietro下去，看路邊的牌子”St Peter‘s Basilica“那邊走，15分鐘就能到聖彼得廣場，排隊1小時進去聖彼得大教堂，免費的，裡面有米開朗琪羅的成名之作，是聖母瑪利亞抱著耶穌的雕塑，用錘子把聖母敲掉，你坐上去抱著耶穌，然後開始唱生日快樂歌\n\n🎉🎂 **因為今天是 <@${userId}> 的生日！** 該慶祝的時候到了！ 🎂🎉`,

    `不是哥们，这个你真得删，我没事，但是我有个哥们你知道吧，我跟他情同手足，我怕他不小心看到破防了，我当然没事啊，哈哈哈哈，这期删了呗，这跟我朋友的经验有点相似，不过我是无所谓的，没什么感觉，我不轻易破防的，但是我一个朋友可能有点汗流浃背了，他不太舒服想睡了，当然不是我哈，我一直都是行的，以一个旁观者的心态看吧，也不至于破防吧，就是想照顾下我朋友的感受，他有点破防了，还是建议删了吧，換成生日文案。\n\n🎂🎁 因為今天是個特別的日子！ **讓我們一起來歡慶 <@${userId}> 的生日吧！** 🎁🎂`,

    `考上什麼大學並不重要，反正畢業了也是在校門口賣手抓餅（放面糊）（抹勻）（打蛋）（抹勻）（塗肉醬）（撒豆角）（撒蔥花）（放火腿腸）（放薄脆）（放生菜）（打橫捲起來）（切一切）（打竪切兩段）（疊起來裝進紙袋）（裝進塑料袋）（遞給學弟學妹）（擦汗）（彈出老公照片看一眼）（繼續煎餅）經顧客反映，將手抓餅招牌換成了煎餅果子（吹口哨）（自信）（繼續擺攤）（被學生投訴）（慌張）（推著車逃離）（去另一個學校門口擺攤）（拿出生日蛋糕）\n\n🎁🎉 **因為今天是 <@${userId}> 的生日！** 讓我們一起來為他慶祝吧！ 🎉🎁`,
  ];

  const birthdayImages = [
    'https://www.kudoboard.com/wp-content/uploads/2023/10/8j0py4.jpg',
    'https://i.pinimg.com/736x/b0/89/1f/b0891fd61dc1b9ee8d1f08a5468235b6.jpg',
    'https://c.tenor.com/bIR1xVLjWuUAAAAd/tenor.gif',
    'https://scontent.fkhh1-1.fna.fbcdn.net/v/t1.6435-9/131900649_3512405872129235_808928194115552511_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=_ruFowH8bCMQ7kNvgEezKC8&_nc_zt=23&_nc_ht=scontent.fkhh1-1.fna&_nc_gid=A1IqnBRNrKVB2V6UcWM6hxy&oh=00_AYBKCIiwW7EVPArrI2OZ6Y95AEM79PM0hljHKLOMmULMwg&oe=67C716AF',
    'https://www.coolest-birthday-cakes.com/files/2015/06/a-computer-engineers-dream-cake-75384-e1435095013566.jpg',
    'https://www.digitalmomblog.com/wp-content/uploads/2022/03/birthday-month-meme-funny.jpeg',
  ];

  const randomMessage = birthdayMessages[Math.floor(Math.random() * birthdayMessages.length)];
  const randomImage = birthdayImages[Math.floor(Math.random() * birthdayImages.length)];

  const sentMessage = await channel.send({
    content: randomMessage,
    files: [randomImage],
  });

  const celebrationEmojis = ['🎉', '🎁', '💖', '🎂', '🥳', '🎈', '✨', '🍰', '🌟', '🎊', '🪅', '🧁', '🥂'];

  const randomEmojis = celebrationEmojis.sort(() => Math.random() - 0.5).slice(0, 7);
  for (const emoji of randomEmojis) {
    await sentMessage.react(emoji);
  }
}
