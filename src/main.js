import { createBot } from "./init.js";

const bot = createBot();
const msgPrefix = process.env.MESSAGE_PREFIX;

bot.once("ready", () => {
  console.log("Bot start running");
});

bot.on("messageCreate", (message) => {
  console.log("Bot got message");

  const { author, content, channel } = message;

  if (author.bot || !content.startsWith(msgPrefix)) {
    return;
  }

  const [commandName, ...commandContent] = content
    .slice(msgPrefix.length)
    .split(/ +/);
});
