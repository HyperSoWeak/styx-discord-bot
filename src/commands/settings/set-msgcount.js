import { SlashCommandBuilder } from 'discord.js';
import { getGuildSettings } from '../../utils/getter.js';

export const data = new SlashCommandBuilder()
  .setName('set-msgcount')
  .setDescription('Toggle message count feature.')
  .addBooleanOption((option) =>
    option.setName('enabled').setDescription('Enable or disable message count feature.').setRequired(true)
  );

export async function execute(interaction) {
  const enabled = interaction.options.getBoolean('enabled');
  const guildId = interaction.guild.id;

  let guildSettings = await getGuildSettings(guildId);
  guildSettings.hasMsgCount = enabled;
  await guildSettings.save();

  if (enabled) {
    await interaction.reply('Message count feature has been enabled for this server.');
  } else {
    await interaction.reply('Message count feature has been disabled for this server.');
  }
}
