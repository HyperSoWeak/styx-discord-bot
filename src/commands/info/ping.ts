import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../components/embed.ts';
import type { Command } from '../../types/command.ts';

class ImplementedCommand implements Command {
  data = new SlashCommandBuilder().setName('ping').setDescription('Displays the bot latency and API ping.');

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const sentMessage = await interaction.reply({
      content: 'Pinging...',
      withResponse: true,
    });

    const roundTripLatency = (sentMessage.resource?.message?.createdTimestamp || 0) - interaction.createdTimestamp;
    const apiPing = interaction.client.ws.ping;

    const pingEmbed = createEmbed(interaction)
      .setTitle('🏓 Pong!')
      .addFields(
        { name: 'Round-trip Latency', value: `${roundTripLatency}ms`, inline: true },
        { name: 'WebSocket Ping', value: `${apiPing}ms`, inline: true }
      )
      .setDescription('Here is the current latency information for the bot.');

    await interaction.editReply({
      content: null,
      embeds: [pingEmbed],
    });
  }
}

export default new ImplementedCommand();
