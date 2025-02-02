import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import GuildSettings from '../../models/GuildSettings.ts';
import { createEmbed } from '../../components/embed.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('server-settings').setDescription('Displays the current server settings.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const guildSettings = await GuildSettings.findOneAndUpdate(
      { guildId: interaction.guildId },
      { guildId: interaction.guildId },
      { new: true, upsert: true }
    );

    if (!guildSettings) {
      await interaction.reply({ content: 'Failed to retrieve the server settings.', ephemeral: true });
      return;
    }

    const settingsEmbed = createEmbed(interaction)
      .setTitle(':gear: Server Settings')
      .addFields(
        { name: 'Message Count', value: guildSettings.hasMsgCount ? 'Enabled' : 'Disabled', inline: true },
        { name: 'Message Relay', value: guildSettings.hasMsgRelay ? 'Enabled' : 'Disabled', inline: true },
        { name: 'Rhyme Test', value: guildSettings.hasRhymeTest ? 'Enabled' : 'Disabled', inline: true },
        { name: 'Timezone', value: guildSettings.timezone, inline: true }
      );

    await interaction.reply({ embeds: [settingsEmbed] });
  }
}

export default new ImplementedCommand();
