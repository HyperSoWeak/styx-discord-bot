import { InteractionContextType, PermissionFlagsBits } from 'discord.js';
import { getGuildSettings } from '../../utils/getter.ts';
import { createInfoEmbed } from '../../components/embed.ts';
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'set-rhymetest',
  description: 'Toggle rhyme test feature.',
  data: (builder) =>
    builder
      .setName('set-rhymetest')
      .setDescription('Toggle rhyme test feature.')
      .addBooleanOption((option) =>
        option.setName('enabled').setDescription('Enable or disable rhyme test feature.').setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
      .setContexts(InteractionContextType.Guild),

  async execute(interaction) {
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
  },
});
