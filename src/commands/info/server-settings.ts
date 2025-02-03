import { SlashCommandBuilder, ChatInputCommandInteraction, InteractionContextType } from 'discord.js';
import GuildSettings from '../../models/GuildSettings.ts';
import { createEmbed, replyInfoEmbed } from '../../components/embed.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('server-settings')
    .setDescription('Displays the current server settings.')
    .setContexts(InteractionContextType.Guild);

  async execute(interaction: ChatInputCommandInteraction) {
    const guildSettings = await GuildSettings.findOneAndUpdate(
      { guildId: interaction.guildId },
      { guildId: interaction.guildId },
      { new: true, upsert: true }
    );

    if (!guildSettings) {
      return await replyInfoEmbed(interaction, 'error', 'Server settings not found.', true);
    }

    const settingsEmbed = createEmbed(interaction)
      .setTitle(':gear: Server Settings')
      .addFields(
        { name: 'Message Count', value: guildSettings.hasMsgCount ? 'Enabled' : 'Disabled', inline: true },
        { name: 'Message Relay', value: guildSettings.hasMsgRelay ? 'Enabled' : 'Disabled', inline: true },
        { name: 'Rhyme Test', value: guildSettings.hasRhymeTest ? 'Enabled' : 'Disabled', inline: true },
        {
          name: 'Birthday Celebration',
          value: guildSettings.hasBirthdayCelebration ? 'Enabled' : 'Disabled',
          inline: true,
        },
        { name: 'Timezone', value: guildSettings.timezone, inline: true },
        {
          name: 'Announcement Channel',
          value: guildSettings.announcementChannel ? `<#${guildSettings.announcementChannel}>` : 'Not set',
          inline: true,
        }
      );

    await interaction.reply({ embeds: [settingsEmbed] });
  }
}

export default new ImplementedCommand();
