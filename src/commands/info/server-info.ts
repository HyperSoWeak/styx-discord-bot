import { InteractionContextType } from 'discord.js';
import { createEmbed } from '../../components/embed.ts';
import { getFormattedDate } from '../../utils/time.ts';
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'server-info',
  description: 'Provides information about the current server.',
  // Using Full Mode because we need setContexts
  data: (builder) =>
    builder
      .setName('server-info')
      .setDescription('Provides information about the current server.')
      .setContexts(InteractionContextType.Guild),

  async execute(interaction) {
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
  },
});
