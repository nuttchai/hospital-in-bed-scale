import { IsWeightVaild } from "./DataValidator";
import { FormatTime } from "./FormatData";

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

export const GetLatestDataWithCompleteAverage = (filteredData) => {
  const numberOfData = filteredData.length;

  if (numberOfData > 1) {
    let secondLastItem = filteredData[numberOfData - 2];
    return secondLastItem;
  }

  return null;
};
