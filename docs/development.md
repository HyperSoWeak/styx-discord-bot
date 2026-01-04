# Developer and Deployment Guide

This guide provides instructions for setting up the development environment, understanding the project architecture, and deploying the Styx Discord Bot.

## Prerequisites

Ensure the following tools are installed on your system:

- Node.js (v20 or higher)
- pnpm (Package manager)
- Docker & Docker Compose (For database and deployment)

## Quick Start

### 1. Install Dependencies

Run the following command to install project dependencies:

```sh
pnpm install
```

### 2. Start Local Database

The project uses a local MongoDB instance running via Docker. This ensures isolation from production data.

```sh
docker compose up -d mongo
```

### 3. Configure Environment Variables

1. Copy the `.env.example` file to `.env.development`.
2. Open `.env.development` and fill in the required variables:
   - DISCORD_TOKEN: Your test bot token.
   - CLIENT_ID: Your test bot application ID.
   - TEST_GUILD_ID: The ID of the server where you want to test commands.
   - MONGODB_URI: This should default to `mongodb://localhost:27018/styx`.

### 4. Start Development Mode

Start the bot in development mode. This connects to the local MongoDB instance started in step 2.

```sh
pnpm run dev
```

Note: In development mode, slash commands are automatically registered to your specified test guild on startup.

### 5. Stop Development

When finished, you can stop the database container:

```sh
docker compose stop mongo
```

## Project Architecture

The project follows a Controller-Service-Model architecture to separate concerns.

### Commands (Controllers)

Located in `src/commands`.
Responsibilities:

- Receive user interaction.
- Validate input parameters.
- Call appropriate services.
- Send responses to the user.

### Services

Located in `src/services`.
Responsibilities:

- Handle business logic.
- Perform calculations.
- Interact with the database via Models.
- Emit events (e.g., for achievements).
- Independent of the Discord UI layer.

### Models

Located in `src/models`.
Responsibilities:

- Define MongoDB schemas using Mongoose.
- Provide data access interfaces.

### Events

Located in `src/events`.
Responsibilities:

- Listen for Discord client events (e.g., `messageCreate`).
- Delegate processing to relevant Services.

## How-To

### Add a New Command

Use the `defineCommand` helper for a simplified, type-safe definition.

File location: `src/commands/<category>/<command-name>.ts`

Example:

```typescript
import { defineCommand } from '../../utils/command.ts';

export default defineCommand({
  name: 'hello',
  description: 'Greets the user',
  options: (cmd) => cmd.addStringOption((opt) => opt.setName('name').setDescription('Your name').setRequired(true)),

  async execute(interaction) {
    const name = interaction.options.getString('name');
    await interaction.reply(`Hello, ${name}!`);
  },
});
```

### Add a New Achievement

Achievements are driven by statistics. Define the achievement configuration, and the system handles the rest.

File location: `src/data/achievements/<category>.ts`

Example:

```typescript
import { defineAchievement } from '../../types/achievement.ts';

export const myAchievements = [
  defineAchievement({
    id: 'talk_1000',
    name: 'Chatterbox',
    description: 'Send 1000 messages',
    emoji: '🗣️',
    condition: {
      type: 'stat_threshold',
      statKey: 'message_count',
      threshold: 1000,
    },
  }),
];
```

## Production Deployment

Production uses Docker to containerize both the bot and the database.

### 1. Configuration

Ensure `.env.production` is populated with your production credentials (Token, Client ID).

### 2. Start Services

Build and start the containers in detached mode:

```sh
docker compose up -d --build
```

### 3. View Logs

Monitor the bot logs:

```sh
docker compose logs -f bot
```

### 4. Deploy Commands

Production mode does not automatically register slash commands to avoid rate limits and API spam. You must manually run the deployment script after adding or modifying commands.

Run this command inside the running bot container:

```sh
docker compose exec bot pnpm run deploy-commands
```

**Note:** Global commands (used in production) can take up to **1 hour** to propagate to all servers due to Discord's caching.

## Code Quality

Before committing changes, run the following commands to ensure code quality:

- Linting: `pnpm run lint`
- Auto-fix Linting: `pnpm run lint --fix`
- Format Check: `pnpm run format:check`

GitHub Actions will automatically run these checks on every push and pull request.
