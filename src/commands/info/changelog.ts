import { SlashCommandBuilder, ComponentType, Message, ChatInputCommandInteraction } from 'discord.js';
import { createEmbed } from '../../components/embed.ts';
import changelogEntries from '../../data/changelog.ts';
import type { Command } from '../../types/command.ts';

const ENTRIES_PER_PAGE = 3;

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('changelog').setDescription('Displays the changelog of the bot.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const totalPages = Math.ceil(changelogEntries.length / ENTRIES_PER_PAGE);
    let currentPage = 0;

    const createChangelogEmbed = (page: number) => {
      const start = page * ENTRIES_PER_PAGE;
      const end = start + ENTRIES_PER_PAGE;
      const entriesForPage = changelogEntries.slice(start, end);

      const changelogEmbed = createEmbed(interaction, `Page ${page + 1} of ${totalPages}`)
        .setTitle(':bookmark_tabs: Changelog')
        .setDescription('Here are the recent updates to the bot:')
        .addFields(
          ...entriesForPage.map((entry: any) => ({
            name: `${entry.version} - ${entry.date}`,
            value: entry.description.join('\n'),
            inline: false,
          }))
        );

      return changelogEmbed;
    };

    const response = await interaction.reply({
      embeds: [createChangelogEmbed(currentPage)],
      components: [getPaginationButtons(currentPage, totalPages)],
      withResponse: true,
    });
    const sentMessage = response.resource?.message;

    const collector = sentMessage!.createMessageComponentCollector({
      componentType: ComponentType.Button,
      time: 60000,
    });

    collector.on('collect', async (i) => {
      if (i.user.id !== interaction.user.id) {
        return i.reply({
          content: 'You are not allowed to interact with these buttons.',
          ephemeral: true,
        });
      }

      if (i.customId === 'next') {
        if (currentPage < totalPages - 1) {
          currentPage++;
        }
      } else if (i.customId === 'previous') {
        if (currentPage > 0) {
          currentPage--;
        }
      }

      await i.update({
        embeds: [createChangelogEmbed(currentPage)],
        components: [getPaginationButtons(currentPage, totalPages)],
      });
    });

    collector.on('end', async () => {
      await (sentMessage as Message).edit({
        components: [],
      });
    });
  }
}

export default new ImplementedCommand();

function getPaginationButtons(currentPage: number, totalPages: number) {
  return {
    type: 1, // Action Row
    components: [
      {
        type: 2, // Button
        style: 1, // Primary
        label: 'Previous',
        customId: 'previous',
        disabled: currentPage === 0, // Disable if on the first page
      },
      {
        type: 2, // Button
        style: 1, // Primary
        label: 'Next',
        customId: 'next',
        disabled: currentPage === totalPages - 1, // Disable if on the last page
      },
    ],
  };
}
