import { ChatInputCommandInteraction, InteractionContextType, SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../components/embed.ts';
import { getFormattedDate } from '../../utils/time.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('server-info')
    .setDescription('Provides information about the current server.')
    .setContexts(InteractionContextType.Guild);

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const { guild } = interaction;
    const owner = await guild?.fetchOwner();

    const serverEmbed = createEmbed(interaction)
      .setTitle(':globe_with_meridians: Server Information')
      .setThumbnail(guild?.iconURL() || '')
      .addFields(
        { name: 'Server Name', value: guild?.name || 'Unknown', inline: true },
        { name: 'Server ID', value: guild?.id || 'Unknown', inline: true },
        { name: 'Owner', value: `${owner?.user.tag}`, inline: true },
        { name: 'Total Members', value: `${guild?.memberCount}`, inline: true },
        { name: 'Creation Date', value: getFormattedDate(guild?.createdAt), inline: true },
        { name: 'Boost Level', value: `${guild?.premiumTier}`, inline: true },
        { name: 'Boosters', value: `${guild?.premiumSubscriptionCount}`, inline: true }
      );

    await interaction.reply({ embeds: [serverEmbed] });
  }
}

export default new ImplementedCommand();
