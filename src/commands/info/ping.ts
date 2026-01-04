import { createEmbed } from '../../components/embed.ts';
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'ping',
  description: 'Displays the bot latency and API ping.',

  async execute(interaction) {
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
  },
});
