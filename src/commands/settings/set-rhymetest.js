import { SlashCommandBuilder } from 'discord.js';
import { getGuildSettings } from '../../utils/getter.js';

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

  if (enabled) {
    await interaction.reply('Rhyme test feature has been enabled for this server.');
  } else {
    await interaction.reply('Rhyme test feature has been disabled for this server.');
  }
}
