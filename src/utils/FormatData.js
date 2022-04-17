import moment from "moment";
import FILTER_TYPE from "../constants/FilterLineDataType";

// const LIMITED_MINUTES = 30;
// const millisecToMinutes = (milliseconds) => Math.floor(milliseconds / 60000);

// export const FormatDataEveryHalfHour = (sheetData) => {
//   const result = [];
//   let dateTimeInit;
//   let total = 0;
//   let count = 0;

//   for (let i = 0; i < sheetData.length; i++) {
//     const item = sheetData[i];
//     const time = item.Time;
//     const date = item.Date;
//     const dateSplit = date.split("/");
//     const timeSplit = time.split(":");
//     const dateTimeCur = new Date(
//       dateSplit[2],
//       dateSplit[1] - 1,
//       dateSplit[0],
//       timeSplit[0],
//       timeSplit[1]
//     );

//     if (i === 0) {
//       dateTimeInit = dateTimeCur;
//     }

//     const diff = dateTimeCur - dateTimeInit; // returns milliseconds
//     const diffMinutes = millisecToMinutes(diff);

//     if (diffMinutes <= LIMITED_MINUTES) {
//       total += parseFloat(item.Result);
//       count++;
//     } else {
//       const dateTimeNext = moment(dateTimeInit)
//         .add(LIMITED_MINUTES, "minutes")
//         .format("DD/MM/YYYY HH:mm");
//       const spliter = dateTimeNext.split(" ");
//       const dateNext = spliter[0];
//       const timeNext = spliter[1];
//       const dateNextSplit = dateNext.split("/");
//       const timeNextSplit = timeNext.split(":");

//       result.push({
//         Date: dateNext,
//         Time: timeNext,
//         Result: String((total / count).toFixed(3)),
//       });

//       count = 1;
//       total = parseFloat(item.Result);
//       dateTimeInit = new Date(
//         dateNextSplit[2],
//         dateNextSplit[1] - 1,
//         dateNextSplit[0],
//         timeNextSplit[0],
//         timeNextSplit[1]
//       );
//     }

//     // Sum up the remaining data
//     if (i === sheetData.length - 1 && count > 0) {
//       result.push({
//         Date: date,
//         Time: time,
//         Result: String((total / count).toFixed(3)),
//       });
//     }
//   }

//   return result;
// };

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

const getNext30Minutes = (dateTime) => {
  const remainder = 30 - (dateTime.minute() % 30);
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
      dateTime = getNext30Minutes(dateTimeCurrent);
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
      dateTime = getNext30Minutes(dateTimeCurrent);
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

  console.log(result);
  return result;
};
