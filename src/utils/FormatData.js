import moment from "moment";
import FILTER_TYPE from "../constants/FilterLineDataType";

const formatYValue = (weight) => parseFloat(weight);

const formatXValue = (date, time, filtertype, datePrev = "") => {
  let xAxis = "";

  if (filtertype === FILTER_TYPE.LATEST_24_HRS) {
    xAxis = datePrev !== date ? `${date}, ${time}` : `${time}`;
  } else {
    xAxis = `${time}`;
  }

  return xAxis;
};

// by default, getTimeNextGivenMinutes is set to 30 minutes
const getTimeNextGivenMinutes = (dateTime, nextMinute = 30) => {
  const remainder = nextMinute - (dateTime.minute() % nextMinute);
  const result = moment(dateTime).add(remainder, "minutes");
  return result;
};

export const FormatToLineData = (filteredData, filterOptions) => {
  if (filteredData.length === 0) return [];

  let datePrev = "";
  const filterType = filterOptions.type;
  const result = [["x", "Set 1"]];

  filteredData.forEach((item) => {
    const date = item.Date;
    const time = FormatTime(item.Time);
    const yValue = formatYValue(item.Result);
    const xValue = formatXValue(date, time, filterType, datePrev);

    result.push([xValue, yValue]);
    datePrev = date;
  });

  return result;
};

export const FormatTime = (givenTime) => {
  const time = givenTime.split(":");
  let hour = time[0];

  if (hour.length === 1) {
    hour = `0${hour}`;
  }

  return `${hour}:${time[1]}`;
};

export const FormatDataEveryHalfHour = (sheetData) => {
  const result = [];
  let date, time, dateTime, formatDateTime;
  let total = 0;
  let count = 0;

  for (let i = 0; i < sheetData.length; i++) {
    const item = sheetData[i];

    if (item.Result === "Error") {
      continue;
    }

    const dateTimeCurrent = moment(
      `${item.Date} ${item.Time}`,
      "DD/MM/YYYY HH:mm"
    );

    if (i === 0) {
      dateTime = getTimeNextGivenMinutes(dateTimeCurrent);
      formatDateTime = dateTime.format("DD/MM/YYYY HH:mm");
      date = formatDateTime.split(" ")[0];
      time = formatDateTime.split(" ")[1];
    }

    if (dateTime.isSameOrAfter(dateTimeCurrent)) {
      total += parseFloat(item.Result);
      count++;
    } else {
      result.push({
        Date: date,
        Time: time,
        Result: String((total / count).toFixed(3)),
      });

      count = 1;
      total = parseFloat(item.Result);
      dateTime = getTimeNextGivenMinutes(dateTimeCurrent);
      formatDateTime = dateTime.format("DD/MM/YYYY HH:mm");
      date = formatDateTime.split(" ")[0];
      time = formatDateTime.split(" ")[1];
    }

    if (i === sheetData.length - 1 && count > 0) {
      result.push({
        Date: dateTimeCurrent.format("DD/MM/YYYY"),
        Time: dateTimeCurrent.format("HH:mm"),
        Result: String((total / count).toFixed(3)),
      });
    }
  }

  return result;
};
