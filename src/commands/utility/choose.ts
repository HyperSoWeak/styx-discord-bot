import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'choose',
  description: 'Chooses between some provided options.',
  options: (cmd) =>
    cmd.addStringOption((option) =>
      option.setName('options').setDescription('The options to choose from (separated by space).').setRequired(true)
    ),

  async execute(interaction) {
    const options = interaction.options.getString('options')?.split(' ') || [];
    const choice = options[Math.floor(Math.random() * options.length)];
    await interaction.reply(choice);
  },
});
