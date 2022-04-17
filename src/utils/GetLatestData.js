import { IsWeightVaild } from "./DataValidator";
import { FormatTime } from "./FormatData";

const GetLatestData = (sheetData) => {
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
      const latestDate = latestValue.Date;
      const latestTime = FormatTime(latestValue.Time);
      const latestDateTime = `${latestDate}, ${latestTime}`;
      const latestWeight = latestValue.Result;

      return {
        latestWeight,
        latestDateTime,
      };
    }
  }

  return null;
};

export default GetLatestData;
