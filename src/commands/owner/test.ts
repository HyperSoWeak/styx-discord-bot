import {
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  ActionRowBuilder,
  MessageFlags,
  ChatInputCommandInteraction,
  EmbedBuilder,
} from 'discord.js';
import { createEmbed, createInfoEmbed } from '../../components/embed.ts';
import type { Command } from '../../types/command.ts';
import { getEmoji } from '../../utils/getter.ts';
import achievements from '../../data/achievements.ts';
import MsgCount from '../../models/MsgCount.ts';
import { achievementManager } from '../../managers/AchievementManager.ts';

class ImplementedCommand implements Command {
  ownerOnly = true;
  data = new SlashCommandBuilder().setName('test').setDescription('For testing purposes.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    achievementManager.grantAchievement(interaction.user.id, 'pofang_silver');

    // const result = await MsgCount.findOneAndUpdate(
    //   { userId: interaction.user.id },
    //   { $set: { pofangCount: 48 } },
    //   { new: true }
    // );
    // console.log('Updated document:', result);

    const achievement = achievements[0];

    const achievementText = `🎉 <@${interaction.user.id}> 已解鎖成就**【${achievement.emoji} ${achievement.name}】**`;
    const achievementEmbed = new EmbedBuilder().setColor('#FFD700').setDescription(achievement.description).setFooter({
      text: `使用 /achievements 查看更多成就`,
    });

    await interaction.reply({ content: achievementText, embeds: [achievementEmbed] });

    // await new Promise((resolve) => setTimeout(resolve, 10000));
    // const message =
    //   getEmoji('pofang_bronze') +
    //   ' ' +
    //   getEmoji('pofang_silver') +
    //   ' ' +
    //   getEmoji('pofang_gold') +
    //   ' ' +
    //   getEmoji('pofang_diamond');

    // const embed1 = createInfoEmbed(interaction, 'success', 'This is a success message.');
    // const embed2 = createInfoEmbed(interaction, 'error', 'This is an error message.');
    // const embed3 = createInfoEmbed(interaction, 'warning', 'This is a warning message.');
    // const embed4 = createInfoEmbed(interaction, 'info', 'This is an info message.');

    // await interaction.reply({ embeds: [embed1, embed2, embed3, embed4] });

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
