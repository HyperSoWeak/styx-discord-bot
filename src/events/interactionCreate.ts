import { Events, MessageFlags, Collection, BaseInteraction, DiscordAPIError } from 'discord.js';
import { isDeveloper } from '../utils/checker.ts';
import type { CustomClient } from '../types/customClient.ts';
import chalk from 'chalk';

export const name = Events.InteractionCreate;

export async function execute(interaction: BaseInteraction) {
  if (!interaction.isChatInputCommand()) return;

  const bot = interaction.client as CustomClient;
  const command = bot.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  const { cooldowns } = bot;

  if (!cooldowns.has(command.data.name)) {
    cooldowns.set(command.data.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.data.name);
  const cooldownAmount = (command.cooldown || 3) * 1000; // Default to 3 seconds cooldown

  if (!isDeveloper(interaction.user.id) && timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return interaction.reply({
        content: `Please wait ${timeLeft.toFixed(1)} more second(s) before using the \`${
          command.data.name
        }\` command again.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  }

  // Check permissions
  if (command.ownerOnly && !isDeveloper(interaction.user.id)) {
    return interaction.reply({
      content: 'You do not have permission to use this command!',
      flags: MessageFlags.Ephemeral,
    });
  }

  // Execute the command
  try {
    await command.execute(interaction);
    timestamps.set(interaction.user.id, now);

    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
  } catch (error) {
    console.error(error);

    if (error instanceof DiscordAPIError && error.code === 10062) {
      console.log(
        chalk.red(
          '[Error] Interaction is no longer valid. Skipping reply... Error occurred in command:',
          command.data.name
        )
      );
      return;
    }

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        flags: MessageFlags.Ephemeral,
      });
    }
  }
}
