import { MessageFlags } from 'discord.js';
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'test',
  description: 'For testing purposes.',
  ownerOnly: true,

  async execute(interaction) {
    await interaction.reply({ content: "I'm working!", flags: MessageFlags.Ephemeral });
  },
});
