import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { replyInfoEmbed } from '../../components/embed.ts';
import GuildSettings from '../../models/GuildSettings.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder()
    .setName('set-birthday-celebration')
    .setDescription('Toggle birthday celebration feature.')
    .addBooleanOption((option) =>
      option.setName('enabled').setDescription('Enable or disable birthday celebration feature.').setRequired(true)
    );

  async execute(interaction: ChatInputCommandInteraction) {
    const enabled = interaction.options.getBoolean('enabled');
    const guildId = interaction.guild?.id || '';

    let guildSettings = await GuildSettings.findOneAndUpdate({ guildId }, { guildId }, { new: true, upsert: true });
    guildSettings.hasBirthdayCelebration = enabled ?? false;
    await guildSettings.save();

    await replyInfoEmbed(
      interaction,
      'success',
      enabled
        ? 'Birthday celebration feature has been **enabled** for this server.'
        : 'Birthday celebration feature has been **disabled** for this server.'
    );
  }
}

export default new ImplementedCommand();
