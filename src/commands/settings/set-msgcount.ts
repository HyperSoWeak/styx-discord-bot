import { InteractionContextType, PermissionFlagsBits } from 'discord.js';
import { getGuildSettings } from '../../utils/getter.ts';
import { createInfoEmbed } from '../../components/embed.ts';
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'set-msgcount',
  description: 'Toggle message count feature.',
  data: (builder) =>
    builder
      .setName('set-msgcount')
      .setDescription('Toggle message count feature.')
      .addBooleanOption((option) =>
        option.setName('enabled').setDescription('Enable or disable message count feature.').setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
      .setContexts(InteractionContextType.Guild),

  async execute(interaction) {
    const enabled = interaction.options.getBoolean('enabled');
    const guildId = interaction.guild?.id || '';

    const guildSettings = await getGuildSettings(guildId);
    guildSettings.hasMsgCount = enabled ?? false;
    await guildSettings.save();

    const embed = createInfoEmbed(
      interaction,
      'success',
      enabled
        ? 'Message count feature has been **enabled** for this server.'
        : 'Message count feature has been **disabled** for this server.'
    );

    await interaction.reply({ embeds: [embed] });
  },
});
