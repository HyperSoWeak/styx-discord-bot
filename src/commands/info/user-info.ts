import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import UserInfo from '../../models/UserInfo.ts';
import { createEmbed } from '../../components/embed.ts';
import { getFormattedDate } from '../../utils/time.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('user-info')
    .setDescription('Provides information about the user who invoked the command or another user if provided.')
    .addUserOption((option) =>
      option.setName('user').setDescription('The user you want to get information about').setRequired(false)
    );

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const targetUser = interaction.options.getUser('user') || interaction.user;
    const targetMember = interaction.guild?.members.cache.get(targetUser.id);

    const userInfo = await UserInfo.findOne({ userId: targetUser.id });
    const birthday = userInfo?.birthday ? getFormattedDate(userInfo.birthday) : 'No birthday set';

    const userEmbed = createEmbed(interaction)
      .setTitle(':technologist: User Information')
      .setThumbnail(targetUser.displayAvatarURL())
      .addFields(
        { name: 'Username', value: `${targetUser.tag}`, inline: true },
        { name: 'User ID', value: `${targetUser.id}`, inline: true },
        { name: 'Joined Server', value: getFormattedDate(targetMember?.joinedAt || null), inline: true },
        { name: 'Account Created', value: getFormattedDate(targetUser.createdAt), inline: true },
        { name: 'Birthday', value: birthday, inline: true },
        { name: 'Roles', value: targetMember?.roles.cache.map((role) => role.name).join(', ') || 'None', inline: false }
      );

    await interaction.reply({ embeds: [userEmbed] });
  }
}

export default new ImplementedCommand();
