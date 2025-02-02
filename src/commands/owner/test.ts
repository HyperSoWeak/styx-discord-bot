import {
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  ActionRowBuilder,
  MessageFlags,
  ChatInputCommandInteraction,
} from 'discord.js';
import { createInfoEmbed } from '../../components/embed.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  ownerOnly = true;
  data = new SlashCommandBuilder().setName('test').setDescription('For testing purposes.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const embed1 = createInfoEmbed(interaction, 'success', 'This is a success message.');
    const embed2 = createInfoEmbed(interaction, 'error', 'This is an error message.');
    const embed3 = createInfoEmbed(interaction, 'warning', 'This is a warning message.');
    const embed4 = createInfoEmbed(interaction, 'info', 'This is an info message.');

    await interaction.reply({ embeds: [embed1, embed2, embed3, embed4] });

    // Example of buttons and interaction collection (commented out for now)
    // const yes = new ButtonBuilder().setCustomId('Yes').setLabel('Yes').setStyle(ButtonStyle.Primary);
    // const no = new ButtonBuilder().setCustomId('No').setLabel('No').setStyle(ButtonStyle.Secondary);

    // const row = new ActionRowBuilder().addComponents(yes, no);

    // const response = await interaction.reply({
    //   content: `Following are some buttons:`,
    //   components: [row],
    //   withResponse: true,
    // });

    // const filter = (i: any) => i.user.id === interaction.user.id;  // Use specific type for i if necessary
    // const collector = response.resource.message.createMessageComponentCollector({ filter, time: 60_000 });

    // collector.on('collect', async (i) => {
    //   if (i.customId === 'Yes') {
    //     await i.reply('You clicked Yes!');
    //   } else if (i.customId === 'No') {
    //     await i.reply('You clicked No!');
    //   }
    // });

    // collector.on('end', async () => {
    //   await interaction.editReply({
    //     content: 'The buttons have been disabled.',
    //     components: [],
    //   });
    // });
  }
}

export default new ImplementedCommand();
