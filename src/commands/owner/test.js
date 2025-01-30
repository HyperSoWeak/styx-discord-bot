import { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ActionRowBuilder, MessageFlags } from 'discord.js';
import { createInfoEmbed } from '../../components/embed.js';

export const data = new SlashCommandBuilder().setName('test').setDescription('For testing purposes.');
export const ownerOnly = true;

export async function execute(interaction) {
  const embed1 = createInfoEmbed(interaction, 'success', 'This is a success message.');
  const embed2 = createInfoEmbed(interaction, 'error', 'This is an error message.');
  const embed3 = createInfoEmbed(interaction, 'warning', 'This is a warning message.');
  await interaction.reply({ embeds: [embed1, embed2, embed3] });

  // const yes = new ButtonBuilder().setCustomId('Yes').setLabel('Yes').setStyle(ButtonStyle.Primary);
  // const no = new ButtonBuilder().setCustomId('No').setLabel('No').setStyle(ButtonStyle.Secondary);

  // const row = new ActionRowBuilder().addComponents(yes, no);

  // const response = await interaction.reply({
  //   content: `Following are some buttons:`,
  //   components: [row],
  //   withResponse: true,
  // });

  // const filter = (i) => i.user.id === interaction.user.id;
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
