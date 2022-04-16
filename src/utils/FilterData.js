import moment from "moment";

import { FormatTime } from "./DateTime";
import FILTER_TYPE from "../constants/FilterLineDataType";

const filterLatest24Hrs = (sheetData) => {
  const result = [];
  const reqDateTime = moment().subtract(1, "days");
  const reqDate = reqDateTime.format("DD/M/YYYY");
  const reqTime = reqDateTime.format("HH:mm");

  sheetData.forEach((item) => {
    const weight = item.Result;

    if (weight !== "Error") {
      const date = item.Date;
      const time = FormatTime(item.Time);

      if (date > reqDate || (date === reqDate && time > reqTime)) {
        result.push(item);
      }
    }
  });

  return result;
};

const FilterData = (
  sheetData,
  filterOptions = { type: null, customDate: null }
) => {
  let filteredData = [];

  switch (filterOptions.type) {
    case FILTER_TYPE.LATEST_24_HRS:
      filteredData = filterLatest24Hrs(sheetData);
      break;
    default:
      filteredData = sheetData;
      break;
  }

  return filteredData;
};

export default FilterData;
