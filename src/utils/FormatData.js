import FILTER_TYPE from "../constants/FilterLineDataType";
import { FormatTime } from "./DateTime";

const FormatYValue = (weight) => parseFloat(weight) / 1000;

const FormatXValue = (date, time, filtertype, datePrev = "") => {
  let xAxis = "";

  if (filtertype === FILTER_TYPE.LATEST_24_HRS) {
    xAxis = datePrev !== date ? `${date}, ${time}` : `${time}`;
  } else {
    xAxis = `${time}`;
  }

  return xAxis;
};

export const FormatToLineData = (lineData, filterOptions) => {
  if (lineData.length === 0) {
    return [];
  }
  let datePrev = "";
  const filterType = filterOptions.type;
  const result = [["x", "Set 1"]];

  lineData.forEach((item) => {
    const date = item.Date;
    const time = item.Time;
    const yValue = FormatYValue(item.Result);
    const xValue = FormatXValue(date, time, filterType, datePrev);

    result.push([xValue, yValue]);
    datePrev = date;
  });

  return result;
};
