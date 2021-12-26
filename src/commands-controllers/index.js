const commandController = (definedCommands) => {
  const msgPrefix = process.env.MESSAGE_PREFIX;
  const definedCommandsKeys = Object.keys(definedCommands);

  return (message) => {
    console.log("Bot got message");

    const { author, content } = message;

    if (author.bot || !content.startsWith(msgPrefix)) {
      return;
    }

    const [commandName, ...commandContent] = content
      .slice(msgPrefix.length)
      .split(/ +/)
      .map((text) => text.toLowerCase());

    definedCommandsKeys.forEach((command) => {
      if (commandName === command) {
        console.log(`Running command ${command}`);

        definedCommands[command]({
          userContent: commandContent,
          message,
        });
      }
    });
  };
};

export default commandController;
