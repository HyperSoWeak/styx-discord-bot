import { InteractionContextType, PermissionFlagsBits } from 'discord.js';
import { replyInfoEmbed } from '../../components/embed.ts';
import GuildSettings from '../../models/GuildSettings.ts';
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'set-birthday-celebration',
  description: 'Toggle birthday celebration feature.',
  data: (builder) =>
    builder
      .setName('set-birthday-celebration')
      .setDescription('Toggle birthday celebration feature.')
      .addBooleanOption((option) =>
        option.setName('enabled').setDescription('Enable or disable birthday celebration feature.').setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
      .setContexts(InteractionContextType.Guild),

  async execute(interaction) {
    const enabled = interaction.options.getBoolean('enabled');
    const guildId = interaction.guild?.id || '';

    const guildSettings = await GuildSettings.findOneAndUpdate({ guildId }, { guildId }, { new: true, upsert: true });
    guildSettings.hasBirthdayCelebration = enabled ?? false;
    await guildSettings.save();

    await replyInfoEmbed(
      interaction,
      'success',
      enabled
        ? 'Birthday celebration feature has been **enabled** for this server.'
        : 'Birthday celebration feature has been **disabled** for this server.'
    );
  },
});
