import { SlashCommandBuilder } from 'discord.js';
import { createEmbed } from '../../components/embed.js';
import fetch from 'node-fetch';

export const data = new SlashCommandBuilder()
  .setName('ntueat')
  .setDescription('Randomly recommends a restaurant to eat near NTU.');

export async function execute(interaction) {
  try {
    const response = await fetch('https://hypersoweak.github.io/ntu-what-to-eat/restaurants.json');
    const restaurants = await response.json();

    const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];

    const restaurantEmbed = createEmbed(interaction, 'Bon Appétit!')
      .setTitle(`🍽️ ${randomRestaurant.name}`)
      .addFields(
        { name: 'Type', value: randomRestaurant.type.join(', '), inline: true },
        { name: 'Rating', value: `${randomRestaurant.rating} ⭐`, inline: true },
        {
          name: 'Price Range',
          value: `NT$${randomRestaurant.price.low} - NT$${randomRestaurant.price.high}`,
          inline: true,
        },
        { name: 'Location', value: randomRestaurant.location, inline: true },
        { name: 'Opening Hours', value: formatOpeningHours(randomRestaurant.opening_time), inline: true },
        { name: 'Google Maps', value: `[Click Here](${randomRestaurant.link})`, inline: true },
        { name: 'Address', value: randomRestaurant.address, inline: false }
      )
      .setDescription('Enjoy your meal!');

    await interaction.reply({ embeds: [restaurantEmbed] });
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Sorry, I could not fetch the restaurant data.', ephemeral: true });
  }
}

function formatOpeningHours(openingTimes) {
  return openingTimes.map((time) => `• ${time.start} - ${time.end}`).join('\n');
}
