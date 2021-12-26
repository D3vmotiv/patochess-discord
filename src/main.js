import { createBot } from "./init.js";
import { playGame } from "./commands-controllers/definedCommands.js";
import commandController from "./commands-controllers/index.js";

const bot = createBot();

bot.once("ready", () => {
  console.log("Bot start running");
});

bot.on(
  "messageCreate",
  commandController({
    zagraj: playGame,
  })
);
