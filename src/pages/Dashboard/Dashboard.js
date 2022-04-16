import React, { useState, useEffect, useCallback } from "react";

import "./Dashboard.css";
import LineGraph from "../../components/LineGraph/LineGraph";
import WeightCard from "../../components/WeightCard/WeightCard";
import WeightTable from "../../components/WeightTable/WeightTable";
import FilterData from "../../utils/FilterData";
import DescriptionText from "../../constants/DescriptionText";
import RESULT_MOCK from "../../data/ResultMock";
import FILTER_TYPE from "../../constants/FilterLineDataType";
import { IsWeightVaild } from "../../utils/DataValidator";
import { FormatToLineData } from "../../utils/FormatData";
import { FormatTime } from "../../utils/FormatData";
import { FetchSheetData } from "../../api/SheetAPI";

const weightUnit = DescriptionText.weightUnit || "kg";

const Dashboard = () => {
  const [sheetData, setSheetData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    type: FILTER_TYPE.LATEST_24_HRS,
    customDate: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchContent = useCallback(async () => {
    try {
      // const data = await FetchSheetData();
      const data = RESULT_MOCK; // Saving Limited Number Of Request
      setSheetData(data);
    } catch (error) {
      console.log(error);
    }
  }, [setSheetData]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    const filteredData = FilterData(sheetData, filterOptions);
    const lineData = FormatToLineData(filteredData, filterOptions);

    setFilteredData(filteredData);
    setLineData(lineData);
    setIsLoading(true);
  }, [sheetData, filterOptions]);

  if (!isLoading) {
    return <div>Loading Data...</div>;
  }

  let LineGraphComponent,
    WeightCardComponent,
    WeightTableComponent = <div>No Data Shown</div>;

  if (filteredData.length > 0) {
    const dateHeader =
      filterOptions.type === FILTER_TYPE.LATEST_24_HRS
        ? DescriptionText.last24Hrs
        : filteredData[0].Date;

    LineGraphComponent = (
      <LineGraph
        lineData={lineData}
        date={dateHeader}
        weightUnit={weightUnit}
      />
    );
    WeightTableComponent = (
      <WeightTable
        data={filteredData}
        date={dateHeader}
        weightUnit={weightUnit}
      />
    );
  }

  if (sheetData.length > 0) {
    let index = sheetData.length - 1;

    while (!IsWeightVaild(sheetData[index].Result)) {
      if (index === 0) {
        break;
      }
      index--;
    }

    if (index >= 0) {
      const latestValue = sheetData[index];
      const latestDate = latestValue.Date;
      const latestTime = FormatTime(latestValue.Time);
      const latestDateTime = `${latestDate}, ${latestTime}`;
      const latestWeight = latestValue.Result;

      WeightCardComponent = (
        <WeightCard
          dateTime={latestDateTime}
          weight={latestWeight}
          weightUnit={weightUnit}
        />
      );
    }
  }

  return (
    <div>
      {LineGraphComponent}
      {WeightCardComponent}
      {WeightTableComponent}
    </div>
  );
};

export default Dashboard;
