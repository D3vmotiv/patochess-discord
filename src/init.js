import { Client, Intents } from "discord.js";
import dotenv from "dotenv";

const createBot = () => {
  dotenv.config();

  const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  });

  client.login(process.env.DISCORD_TOKEN);

  return client;
};

export { createBot };
