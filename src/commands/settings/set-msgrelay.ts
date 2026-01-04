import { InteractionContextType, PermissionFlagsBits } from 'discord.js';
import { getGuildSettings } from '../../utils/getter.ts';
import { createInfoEmbed } from '../../components/embed.ts';
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'set-msgrelay',
  description: 'Toggle message relay feature.',
  data: (builder) =>
    builder
      .setName('set-msgrelay')
      .setDescription('Toggle message relay feature.')
      .addBooleanOption((option) =>
        option.setName('enabled').setDescription('Enable or disable message relay feature.').setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
      .setContexts(InteractionContextType.Guild),

  async execute(interaction) {
    const enabled = interaction.options.getBoolean('enabled');
    const guildId = interaction.guild?.id || '';

    const guildSettings = await getGuildSettings(guildId);
    guildSettings.hasMsgRelay = enabled ?? false;
    await guildSettings.save();

    const embed = createInfoEmbed(
      interaction,
      'success',
      enabled
        ? 'Message relay feature has been **enabled** for this server.'
        : 'Message relay feature has been **disabled** for this server.'
    );

    await interaction.reply({ embeds: [embed] });
  },
});
