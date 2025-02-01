import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../components/embed.js';
import { getFormattedDate } from '../../utils/time.js';

export const data = new SlashCommandBuilder()
  .setName('server-info')
  .setDescription('Provides information about the current server.');

export async function execute(interaction) {
  const { guild } = interaction;
  const owner = await guild.fetchOwner();

  const serverEmbed = createEmbed(interaction)
    .setTitle(':globe_with_meridians: Server Information')
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .addFields(
      { name: 'Server Name', value: guild.name, inline: true },
      { name: 'Server ID', value: guild.id, inline: true },
      { name: 'Owner', value: `${owner.user.tag}`, inline: true },
      { name: 'Total Members', value: `${guild.memberCount}`, inline: true },
      { name: 'Creation Date', value: getFormattedDate(guild.createdAt), inline: true },
      { name: 'Boost Level', value: `${guild.premiumTier}`, inline: true },
      { name: 'Boosters', value: `${guild.premiumSubscriptionCount}`, inline: true }
    );

  await interaction.reply({ embeds: [serverEmbed] });
}
