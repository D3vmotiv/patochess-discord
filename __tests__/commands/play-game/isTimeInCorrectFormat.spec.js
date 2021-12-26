import { isTimeInCorrectFormat } from "./../../../src/commands-controllers/playGame.js";

describe("PlayGame Command - Is time in correct format", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shouldnt pass when time is not a number", () => {
    let time = "aa";
    expect(isTimeInCorrectFormat(time)).toBe(false);

    time = "a2";
    expect(isTimeInCorrectFormat(time)).toBe(false);

    time = "2a";
    expect(isTimeInCorrectFormat(time)).toBe(false);

    time = "a2a";
    expect(isTimeInCorrectFormat(time)).toBe(false);

    time = "1O";
    expect(isTimeInCorrectFormat(time)).toBe(false);
  });

  it("shouldnt pass when time is less than 1", () => {
    let time = -1;
    expect(isTimeInCorrectFormat(time)).toBe(false);

    time = 0;
    expect(isTimeInCorrectFormat(time)).toBe(false);
  });

  it("shouldnt pass when time isnt integer", () => {
    let time = 0.2;
    expect(isTimeInCorrectFormat(time)).toBe(false);

    time = 0.8;
    expect(isTimeInCorrectFormat(time)).toBe(false);
  });

  it("should pass when time is higher than 59", () => {
    let time = 60;
    expect(isTimeInCorrectFormat(time)).toBe(false);

    time = 122;
    expect(isTimeInCorrectFormat(time)).toBe(false);
  });

  it("should pass when given data is correct", () => {
    let time = 2;
    expect(isTimeInCorrectFormat(time)).toBe(true);

    time = 20;
    expect(isTimeInCorrectFormat(time)).toBe(true);

    time = 5.0;
    expect(isTimeInCorrectFormat(time)).toBe(true);
  });
});
