import FILTER_TYPE from "../constants/FilterLineDataType";

export const FormatTime = (givenTime) => {
  const time = givenTime.split(":");
  let hour = time[0];

  if (hour.length === 1) {
    hour = `0${hour}`;
  }

  return `${hour}:${time[1]}`;
};
