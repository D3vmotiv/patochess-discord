const isTimeInCorrectFormat = (time, maxNumber = 59) => {
  if (Number.isNaN(time)) {
    console.log(1);
    return false;
  }

  if (time < 1) {
    console.log(2);
    return false;
  }

  if (!Number.isInteger(time)) {
    console.log(3);
    return false;
  }

  if (time > maxNumber) {
    console.log(5);
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

const playGame = ({ userContent, message }) => {
  const timeControl = getTimeControl(userContent[0] ?? null);
  console.log({ timeControl });
};

export default playGame;
