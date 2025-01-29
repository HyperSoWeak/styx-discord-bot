import mongoose from 'mongoose';
import chalk from 'chalk';
import token from './token.json' with { 'type': 'json' };

export async function connectDB() {
  await mongoose.connect(token.mongodb);
}

mongoose.connection.on('connected', () => console.log(chalk.green('[Database] connected to MongoDB')));
mongoose.connection.on('connecting', () => console.log(chalk.cyan('[Database] connecting...')));
mongoose.connection.on('disconnected', () => console.log(chalk.yellow('[Database] disconnected')));
mongoose.connection.on('error', (err) => console.log(chalk.red(`[Database] connection error: ${err}`)));
