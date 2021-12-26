import definedCommands from "./../../src/commands-controllers/index.js";

describe("Defined commands controller", () => {
  const defaultMessage = {
    channel: {
      send: jest.fn(),
    },
    content: "test",
    author: {},
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create commands controller", () => {
    const controller = definedCommands({});

    expect(controller).toBeTruthy();
  });

  it("should react on declared command", () => {
    const commandFunction = jest.fn();

    const onMessage = definedCommands({
      zagraj: commandFunction,
    });

    onMessage({ ...defaultMessage, content: "zagraj" });

    expect(commandFunction).toHaveBeenCalledTimes(1);
  });

  it("shouldn't react on bad command", () => {
    const commandFunction = jest.fn();

    const onMessage = definedCommands({
      zagraj: commandFunction,
    });

    onMessage({ ...defaultMessage, content: "z@graj" });

    expect(commandFunction).toHaveBeenCalledTimes(0);
  });

  it("shouldn't react on bot messages", () => {
    const commandFunction = jest.fn();

    const onMessage = definedCommands({
      zagraj: commandFunction,
    });

    onMessage({ ...defaultMessage, content: "zagraj", author: { bot: true } });

    expect(commandFunction).toHaveBeenCalledTimes(0);
  });
});
