import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../components/embed.js';

export const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Provides information about the user who invoked the command.');

export async function execute(interaction) {
  const user = interaction.user;
  const member = interaction.member;

  const userEmbed = createEmbed(interaction)
    .setTitle('User Information')
    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    .addFields(
      { name: 'Username', value: `${user.tag}`, inline: true },
      { name: 'User ID', value: `${user.id}`, inline: true },
      { name: 'Joined Server', value: member.joinedAt.toDateString(), inline: true },
      { name: 'Account Created', value: user.createdAt.toDateString(), inline: true },
      { name: 'Roles', value: member.roles.cache.map((role) => role.name).join(', '), inline: false }
    );

  await interaction.reply({ embeds: [userEmbed] });
}
