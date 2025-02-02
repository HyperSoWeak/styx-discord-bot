import { SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import GuildSettings from '../../models/GuildSettings.ts';
import moment from 'moment-timezone';
import { createInfoEmbed } from '../../components/embed.ts';

export const data = new SlashCommandBuilder()
  .setName('set-timezone')
  .setDescription('Set the timezone for the guild.')
  .addStringOption((option) =>
    option
      .setName('timezone')
      .setDescription('Provide the timezone in IANA format (e.g., Asia/Taipei, Etc/GMT+8).')
      .setRequired(true)
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const timezoneInput = interaction.options.getString('timezone') || '';

  // Check if the input is a valid timezone
  if (!moment.tz.zone(timezoneInput)) {
    return interaction.reply({
      embeds: [
        createInfoEmbed(
          interaction,
          'error',
          'Invalid timezone provided. Please use a valid IANA timezone (e.g., Asia/Taipei, Etc/GMT+8).\nFor a list of valid timezones, see: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones'
        ),
      ],
    });
  }

  const updatedGuild = await GuildSettings.findOneAndUpdate(
    { guildId: interaction.guild?.id },
    { timezone: timezoneInput },
    { new: true, upsert: true }
  );

  interaction.reply({
    embeds: [createInfoEmbed(interaction, 'success', `Timezone has been updated to **${updatedGuild.timezone}**.`)],
  });
}
