import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder().setName('botinfo').setDescription('Provides information about the bot.');

export async function execute(interaction) {
  const bot = interaction.client;

  const uptime = bot.uptime;
  const hours = Math.floor(uptime / (1000 * 60 * 60));
  const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((uptime % (1000 * 60)) / 1000);

  const developers = bot.config.developers.map((dev) => dev.name).join(', ');

  const botInfoEmbed = new EmbedBuilder()
    .setColor('#0099ff')
    .setTitle('Bot Information')
    .setThumbnail(bot.user.displayAvatarURL())
    .addFields(
      { name: 'Bot Name', value: bot.user.username, inline: true },
      { name: 'Bot ID', value: bot.user.id, inline: true },
      { name: 'Servers', value: `${bot.guilds.cache.size} servers`, inline: true },
      { name: 'Uptime', value: `${hours}h ${minutes}m ${seconds}s`, inline: true },
      { name: 'Created At', value: bot.user.createdAt.toDateString(), inline: true },
      { name: 'Ping', value: `${bot.ws.ping}ms`, inline: true },
      { name: 'Bot Version', value: bot.config.version, inline: true },
      { name: 'Developer(s)', value: developers, inline: true }
    )
    .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
    .setTimestamp();

  await interaction.reply({ embeds: [botInfoEmbed] });
}
