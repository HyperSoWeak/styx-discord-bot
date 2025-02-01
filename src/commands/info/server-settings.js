import { SlashCommandBuilder } from 'discord.js';
import GuildSettings from '../../models/GuildSettings.js';
import { createEmbed } from '../../components/embed.js';

export const data = new SlashCommandBuilder()
  .setName('server-settings')
  .setDescription('Displays the current server settings.');

export async function execute(interaction) {
  const guildSettings = await GuildSettings.findOneAndUpdate(
    { guildId: interaction.guild.id },
    { guildId: interaction.guild.id },
    { new: true, upsert: true }
  );

  const settingsEmbed = createEmbed(interaction)
    .setTitle(':gear: Server Settings')
    .addFields(
      { name: 'Message Count', value: guildSettings.hasMsgCount ? 'Enabled' : 'Disabled', inline: true },
      { name: 'Message Relay', value: guildSettings.hasMsgRelay ? 'Enabled' : 'Disabled', inline: true },
      { name: 'Rhyme Test', value: guildSettings.hasRhymeTest ? 'Enabled' : 'Disabled', inline: true },
      { name: 'Timezone', value: guildSettings.timezone, inline: true }
    );

  await interaction.reply({ embeds: [settingsEmbed] });
}
