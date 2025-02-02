import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { getGuildSettings } from '../../utils/getter.ts';
import { createInfoEmbed } from '../../components/embed.ts';

export const data = new SlashCommandBuilder()
  .setName('set-msgcount')
  .setDescription('Toggle message count feature.')
  .addBooleanOption((option) =>
    option.setName('enabled').setDescription('Enable or disable message count feature.').setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const enabled = interaction.options.getBoolean('enabled');
  const guildId = interaction.guild?.id || '';

  let guildSettings = await getGuildSettings(guildId);
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
}
