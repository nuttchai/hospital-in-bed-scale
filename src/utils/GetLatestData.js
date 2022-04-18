import moment from "moment";
import { IsWeightVaild } from "./DataValidator";
import { FormatTime } from "./FormatData";
import { IsFirstDateSameOrGreaterThanSecondDate } from "./DateComparer";

export const GetLatestData = (sheetData) => {
  if (sheetData.length > 0) {
    let index = sheetData.length - 1;

    while (!IsWeightVaild(sheetData[index].Result)) {
      index--;

      if (index < 0) {
        break;
      }
    }

    if (index >= 0) {
      const latestValue = sheetData[index];

      return {
        Date: latestValue.Date,
        Time: FormatTime(latestValue.Time),
        Result: latestValue.Result,
      };
    }
  }

  return null;
};

export const GetAverageWeightWithinGivenTime = (
  sheetData,
  givenTime = 1,
  format = "days"
) => {
  const dateTime = moment();
  const reqDateTime = dateTime.subtract(givenTime, format);
  let total = 0;
  let count = 0;

  sheetData.forEach((item) => {
    const itemDateTime = moment(
      item.Date + " " + item.Time,
      "DD/MM/YYYY HH:mm"
    );
    const weight = item.Result;
    const isWeightVaild = IsWeightVaild(weight);
    const isDateVaild = IsFirstDateSameOrGreaterThanSecondDate(
      itemDateTime,
      reqDateTime
    );

    if (isDateVaild && isWeightVaild) {
      total += parseFloat(weight);
      count++;
    }
  });

  if (count === 0) return null;

  return (total / count).toFixed(3);
};
