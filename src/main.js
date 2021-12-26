import { createBot } from "./init.js";

const bot = createBot();

bot.once("ready", () => {
  console.log(321);
});
