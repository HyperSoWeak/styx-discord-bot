import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import UserInfo from '../../models/UserInfo.js';
import { createInfoEmbed } from '../../components/embed.js';

export const data = new SlashCommandBuilder()
  .setName('set-birthday')
  .setDescription('Set or clear your birthday.')
  .addStringOption((option) =>
    option
      .setName('date')
      .setDescription('Your birthday in YYYY-MM-DD format or type "clear" to remove it.')
      .setRequired(true)
  );

export async function execute(interaction) {
  const dateInput = interaction.options.getString('date').toLowerCase();

  if (dateInput === 'clear') {
    await UserInfo.findOneAndUpdate({ userId: interaction.user.id }, { $unset: { birthday: 1 } });

    return interaction.reply({
      embeds: [createInfoEmbed(interaction, 'success', 'Your birthday has been cleared.')],
      flags: MessageFlags.Ephemeral,
    });
  }

  // Check if the date is valid
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateInput)) {
    return interaction.reply({
      embeds: [createInfoEmbed(interaction, 'error', 'Please provide a valid date in the format YYYY-MM-DD.')],
      flags: MessageFlags.Ephemeral,
    });
  }

  const birthday = new Date(dateInput);
  if (isNaN(birthday.getTime())) {
    return interaction.reply({
      embeds: [createInfoEmbed(interaction, 'error', 'Please provide a valid date in the format YYYY-MM-DD.')],
      flags: MessageFlags.Ephemeral,
    });
  }

  await UserInfo.findOneAndUpdate({ userId: interaction.user.id }, { birthday: birthday }, { upsert: true, new: true });

  return interaction.reply({
    embeds: [
      createInfoEmbed(interaction, 'success', `Your birthday has been set to ${birthday.toISOString().split('T')[0]}.`),
    ],
    flags: MessageFlags.Ephemeral,
  });
}
