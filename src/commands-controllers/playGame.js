import axios from "axios";

const isTimeInCorrectFormat = (time, maxNumber = 59) => {
  if (Number.isNaN(time)) {
    return false;
  }

  if (time < 1) {
    return false;
  }

  if (!Number.isInteger(time)) {
    return false;
  }

  if (time > maxNumber) {
    return false;
  }

  return true;
};

const getTimeControl = (userTimeControl) => {
  const defaultTimeControl = {
    limit: Number(process.env.TIME_CONTROL_LIMIT),
    increment: Number(process.env.TIME_CONTROL_INCREMENT),
  };

  const timeControl = Object.assign({}, defaultTimeControl);

  if (userTimeControl) {
    if (userTimeControl.includes("+")) {
      const [limiString, incrementString] = userTimeControl.split("+");

      const userLimitTimeControl = Number(limiString);
      const userIncrementTimeControl = Number(incrementString);

      if (isTimeInCorrectFormat(userLimitTimeControl)) {
        timeControl.limit = userLimitTimeControl;
      }
      if (isTimeInCorrectFormat(userIncrementTimeControl)) {
        timeControl.increment = userIncrementTimeControl;
      }
    } else {
      const userLimitTimeControl = Number(userTimeControl);

      if (isTimeInCorrectFormat(userLimitTimeControl)) {
        timeControl.limit = userLimitTimeControl;
      }
    }
  }

  return timeControl;
};

let isMakingRequest = false;
const playGame = ({ userContent, message }) => {
  const timeControl = getTimeControl(userContent[0] ?? null);

  if (isMakingRequest) {
    return;
  }
  isMakingRequest = true;

  axios
    .post("https://lichess.org/api/challenge/open", {
      rated: false,
      name: `Giga wyzwanie od ${message.author.username ?? ""}`,
      clock: {
        limit: 60 * timeControl.limit,
        increment: timeControl.increment,
      },
    })
    .then(({ data }) => {
      const { challenge } = data;
      message.channel.send(`Twoja gra została stworzona: ${challenge.url}`);
    })
    .catch((errorResp) => {
      const error = errorResp.response.data.error;
      message.channel.send(`Wystąpił błąd: ${error.toString()}`);
      console.error(error);
    })
    .finally(() => {
      isMakingRequest = false;
    });
};

export default playGame;
