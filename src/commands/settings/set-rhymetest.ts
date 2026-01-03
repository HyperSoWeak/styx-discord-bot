import {
  ChatInputCommandInteraction,
  InteractionContextType,
  PermissionFlagsBits,
  SlashCommandBuilder,
} from 'discord.js';
import { getGuildSettings } from '../../utils/getter.ts';
import { createInfoEmbed } from '../../components/embed.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('set-rhymetest')
    .setDescription('Toggle rhyme test feature.')
    .addBooleanOption((option) =>
      option.setName('enabled').setDescription('Enable or disable rhyme test feature.').setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .setContexts(InteractionContextType.Guild);

  async execute(interaction: ChatInputCommandInteraction) {
    const enabled = interaction.options.getBoolean('enabled');
    const guildId = interaction.guild?.id || '';

    const guildSettings = await getGuildSettings(guildId);
    guildSettings.hasRhymeTest = enabled ?? false;
    await guildSettings.save();

    const embed = createInfoEmbed(
      interaction,
      'success',
      enabled
        ? 'Rhyme test feature has been **enabled** for this server.'
        : 'Rhyme test feature has been **disabled** for this server.'
    );

    await interaction.reply({ embeds: [embed] });
  }
}

export default new ImplementedCommand();
