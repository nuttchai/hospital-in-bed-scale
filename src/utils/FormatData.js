import { FormatTime } from "./DateTime";

export const FormatToLineData = (lineData) => {
  if (lineData.length === 0) {
    return [];
  }
  const result = [["x", "Set 1"]];

  lineData.forEach((item) => {
    const weight = item.Result;
    const date = item.Date;
    const time = FormatTime(item.Time);
    const dateTime = `${date}, ${time}`;
    result.push([dateTime, parseFloat(weight) / 1000]);
  });

  return result;
};
