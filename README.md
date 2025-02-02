# Styx Discord Bot

Styx is a powerful and flexible Discord bot, offering a rich set of features to elevate your server's user experience. Whether you're a server owner or a casual user, Styx has something for everyone.

## ✨ Features

- **Music**: Play and control music directly in your server.
- **Mini-Games**: Fun and interactive mini-games to entertain your community.
- **Birthday Celebration**: Celebrate you and your friend's birthdays with automated messages!
- **Message Count & Relay Feature**: Detect some keywords and count or reply just for fun!
- **Rhyme Detection Feature**: Detect and highlight rhymes in user messages.
- **Competitive Programming Stats**: Fetch and display competitive programming statistics for users.

And more!

## 🔧 Tech Stack

- **Node.js**: Efficient event-driven architecture for handling asynchronous operations.
- **Discord.js**: A versatile library for interacting with the Discord API.
- **TypeScript**: Ensures strong typing and scalable code.
- **MongoDB**: Persistent storage for user data, leaderboards, and more.

## 📝 Commands

Styx offers a wide range of commands to suit various needs, you can use `/help` to view a list of available commands and their descriptions.

More commands are available and constantly being updated!

## 🚀 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/HyperSoWeak/styx-discord-bot.git
   ```

2. **Navigate into the directory**:

   ```bash
   cd styx-discord-bot
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Set up tokens**:

   Create a `token.json` file under `src/` and add your bot token and MongoDB URI:

   ```json
   {
     "client": "your-bot-token-here",
     "testClient": "your-test-bot-token-here",
     "mongodb": "your-mongodb-uri-here"
   }
   ```

5. **Deploy the commands**:

   ```bash
   npm run deploy-commands
   ```

6. **Start the bot**:

   ```bash
   npm start
   ```

## 🤝 Contributing

Want to improve Styx? Contributions are welcome! Here's how you can help:

1. **Fork the project**.
2. **Create your feature branch**: `git checkout -b feature/my-feature`.
3. **Commit your changes**: `git commit -m 'Add some feature'`.
4. **Push to the branch**: `git push origin feature/my-feature`.
5. **Open a pull request**.

Feel free to suggest features, report bugs, or open issues to help make Styx even better!

## 📄 License

This project is licensed under the GNU General Public License (GPL) v3.0 - see the [LICENSE](./LICENSE) file for details.

---

Made with ❤️ by [HyperSoWeak](https://github.com/HyperSoWeak).
