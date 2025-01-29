import { SlashCommandBuilder } from 'discord.js';
import { getGuildSettings } from '../../utils/getter.js';

export const data = new SlashCommandBuilder()
  .setName('set-msg-count')
  .setDescription('Toggle message count tracking system.')
  .addBooleanOption((option) =>
    option.setName('enabled').setDescription('Enable or disable message count tracking system.').setRequired(true)
  );

export async function execute(interaction) {
  const enabled = interaction.options.getBoolean('enabled');
  const guildId = interaction.guild.id;

  try {
    let guildSettings = await getGuildSettings(guildId);
    guildSettings.hasMsgCount = enabled;
    await guildSettings.save();

    if (enabled) {
      await interaction.reply('Message count tracking system has been enabled for this server.');
    } else {
      await interaction.reply('Message count tracking system has been disabled for this server.');
    }
  } catch (error) {
    console.error('Error toggling message count tracking system:', error);
    await interaction.reply('There was an error while toggling the message count tracking system.');
  }
}
