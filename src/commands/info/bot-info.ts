import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../components/embed.ts';
import { getFormattedDate } from '../../utils/time.ts';
import type { CustomClient } from '../../types/customClient.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('bot-info').setDescription('Provides information about the bot.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const bot = interaction.client as CustomClient;

    const uptime = bot.uptime || 0;
    const days = Math.floor(uptime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((uptime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((uptime % (1000 * 60 * 60)) / (1000 * 60));

    const developers = bot.config.developers.map((dev: { name: string }) => dev.name).join(', ');

    const botInfoEmbed = createEmbed(interaction)
      .setTitle(':robot: Bot Information')
      .setThumbnail(bot.user?.displayAvatarURL() || '')
      .addFields(
        { name: 'Bot Name', value: bot.user?.username || 'Unknown', inline: true },
        { name: 'Bot ID', value: bot.user?.id || 'Unknown', inline: true },
        { name: 'Servers', value: `${bot.guilds.cache.size} servers`, inline: true },
        { name: 'Uptime', value: `${days}d ${hours}h ${minutes}m`, inline: true },
        { name: 'Created At', value: getFormattedDate(bot.user?.createdAt), inline: true },
        { name: 'Ping', value: `${bot.ws.ping}ms`, inline: true },
        { name: 'Bot Version', value: bot.config.version, inline: true },
        { name: 'Developer(s)', value: developers, inline: true }
      );

    await interaction.reply({ embeds: [botInfoEmbed] });
  }
}

export default new ImplementedCommand();
