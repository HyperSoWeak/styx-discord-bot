import { InteractionContextType, MessageFlags, TextChannel } from 'discord.js';
import { createEmbed, createInfoEmbed } from '../../components/embed.ts';
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'vote-simple',
  description: 'Create a simple vote with up to 10 options. Users can react to vote.',
  cooldown: 20,
  data: (builder) =>
    builder
      .setName('vote-simple')
      .setDescription('Create a simple vote with up to 10 options. Users can react to vote.')
      .addStringOption((option) =>
        option.setName('question').setDescription('The question or topic for the vote.').setRequired(true)
      )
      .addStringOption((option) => option.setName('option1').setDescription('First voting option.').setRequired(true))
      .addStringOption((option) => option.setName('option2').setDescription('Second voting option.').setRequired(true))
      .addStringOption((option) => option.setName('option3').setDescription('Third voting option.').setRequired(false))
      .addStringOption((option) => option.setName('option4').setDescription('Fourth voting option.').setRequired(false))
      .addStringOption((option) => option.setName('option5').setDescription('Fifth voting option.').setRequired(false))
      .addStringOption((option) => option.setName('option6').setDescription('Sixth voting option.').setRequired(false))
      .addStringOption((option) =>
        option.setName('option7').setDescription('Seventh voting option.').setRequired(false)
      )
      .addStringOption((option) => option.setName('option8').setDescription('Eighth voting option.').setRequired(false))
      .addStringOption((option) => option.setName('option9').setDescription('Ninth voting option.').setRequired(false))
      .addStringOption((option) => option.setName('option10').setDescription('Tenth voting option.').setRequired(false))
      .setContexts(InteractionContextType.Guild),

  async execute(interaction) {
    await interaction.deferReply({ flags: MessageFlags.Ephemeral });

    const question = interaction.options.getString('question');
    const options = [
      interaction.options.getString('option1'),
      interaction.options.getString('option2'),
      interaction.options.getString('option3'),
      interaction.options.getString('option4'),
      interaction.options.getString('option5'),
      interaction.options.getString('option6'),
      interaction.options.getString('option7'),
      interaction.options.getString('option8'),
      interaction.options.getString('option9'),
      interaction.options.getString('option10'),
    ].filter(Boolean);

    if (!interaction.guildId) return;

    const emojis = ['🍎', '🍊', '🍌', '🍇', '🍉', '🍓', '🍒', '🍑', '🍍', '🥝'];
    const randomEmojis = emojis.sort(() => Math.random() - 0.5);

    const embed = createEmbed(interaction)
      .setTitle(`📊 ${question}`)
      .setDescription(options.map((option, index) => `${randomEmojis[index]} ${option}`).join('\n'));

    const sentMessage = await (interaction.channel as TextChannel).send({ embeds: [embed] });

    for (let i = 0; i < options.length; i++) {
      await sentMessage.react(randomEmojis[i]);
    }

    await interaction.editReply({
      embeds: [createInfoEmbed(interaction, 'success', 'Vote created successfully!')],
    });
  },
});
