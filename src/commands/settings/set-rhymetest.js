import { SlashCommandBuilder } from 'discord.js';
import { getGuildSettings } from '../../utils/getter.js';
import { createInfoEmbed } from '../../components/embed.js';

export const data = new SlashCommandBuilder()
  .setName('set-rhymetest')
  .setDescription('Toggle rhyme test feature.')
  .addBooleanOption((option) =>
    option.setName('enabled').setDescription('Enable or disable rhyme test feature.').setRequired(true)
  );

export async function execute(interaction) {
  const enabled = interaction.options.getBoolean('enabled');
  const guildId = interaction.guild.id;

  let guildSettings = await getGuildSettings(guildId);
  guildSettings.hasRhymeTest = enabled;
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
