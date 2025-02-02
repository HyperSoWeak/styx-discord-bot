import { ChatInputCommandInteraction, SlashCommandBuilder, TextChannel } from 'discord.js';
import GuildSettings from '../../models/GuildSettings.ts';
import type { Command } from '../../types/command.ts';
import { replyInfoEmbed } from '../../components/embed.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('set-announcement-channel')
    .setDescription('Sets or clears the channel for announcements.')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('The channel to set for announcements (leave empty to clear)')
        .setRequired(false)
    );

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const channel = interaction.options.getChannel('channel') as TextChannel;
    const guildId = interaction.guildId;

    const guildSettings = await GuildSettings.findOneAndUpdate({ guildId }, { guildId }, { new: true, upsert: true });

    if (!channel.isSendable()) {
      return replyInfoEmbed(interaction, 'error', 'Please provide a channel that I can send messages to.');
    }

    if (channel) {
      guildSettings.announcementChannel = channel.id;
      await guildSettings.save();
      await replyInfoEmbed(
        interaction,
        'success',
        `Announcement channel has been set to <#${channel.id}> for this server.`
      );
    } else {
      guildSettings.announcementChannel = null;
      await guildSettings.save();
      await replyInfoEmbed(interaction, 'success', `Announcement channel has been cleared for this server.`);
    }
  }
}

export default new ImplementedCommand();
