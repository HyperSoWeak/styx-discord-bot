import { createEmbed } from '../../components/embed.ts';
import achievements, { Achievement } from '../../data/achievements.ts';
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'achievement-list',
  description: 'Displays a list of all available achievements.',

  async execute(interaction) {
    const fields = achievements.map((achievement: Achievement) => ({
      name: `${achievement.emoji} ${achievement.name}`,
      value: `✨ ${achievement.description}`,
    }));

    const achievementListEmbed = createEmbed(interaction)
      .setTitle('🏆 All Available Achievements')
      .setDescription('Here is a list of all achievements you can earn:')
      .addFields(fields);

    await interaction.reply({
      embeds: [achievementListEmbed],
    });
  },
});
