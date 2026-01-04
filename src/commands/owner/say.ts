import { MessageFlags } from 'discord.js';
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'say',
  description: 'Say something as the bot.',
  ownerOnly: true,
  options: (cmd) =>
    cmd.addStringOption((option) => option.setName('content').setDescription('The content to say.').setRequired(true)),

  async execute(interaction) {
    const content = interaction.options.getString('content') || '';

    if (!interaction.channel?.isSendable()) {
      await interaction.reply({
        content: 'I cannot send messages in this channel.',
        flags: MessageFlags.Ephemeral,
      });
      return;
    }

    await interaction.channel.send(content);

    await interaction.reply({
      content: 'Message sent!',
      flags: MessageFlags.Ephemeral,
    });

    await interaction.deleteReply();
  },
});
