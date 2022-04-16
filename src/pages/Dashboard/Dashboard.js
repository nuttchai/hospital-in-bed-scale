import React, { useState, useEffect, useCallback } from "react";

import "./Dashboard.css";
import LineGraph from "../../components/LineGraph/LineGraph";
import WeightCard from "../../components/WeightCard/WeightCard";
import RESULT_MOCK from "../../data/ResultMock";
import FILTER_TYPE from "../../constants/FilterLineDataType";
import { FormatToLineData } from "../../utils/FormatData";
import { FormatTime } from "../../utils/DateTime";
import { FetchSheetData } from "../../api/SheetAPI";
import { LINE_CHART_DESCRIPTION } from "../../constants/DescriptionText";
import FilterData from "../../utils/FilterData";

const Dashboard = () => {
  const [sheetData, setSheetData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    type: FILTER_TYPE.LATEST_24_HRS,
    customDate: null,
  });
  const [lineDesc, setLineDesc] = useState(
    LINE_CHART_DESCRIPTION.LATEST_24_HRS
  );
  const [isFilter, setIsFilter] = useState(false);

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
    setIsFilter(true);
  }, [sheetData, filterOptions]);

  if (!isFilter) {
    return <div>Loading Page...</div>;
  }

  let LineGraphComponent,
    WeightCardComponent = <div>No Data Shown</div>;

  if (lineData.length > 1) {
    LineGraphComponent = <LineGraph lineData={lineData} lineDesc={lineDesc} />;
  }

  if (filteredData.length > 0) {
    const latestValue = filteredData[filteredData.length - 1];
    const latestDateTime = `${latestValue.Date}, ${FormatTime(
      latestValue.Time
    )}`;
    const latestWeight = latestValue.Result / 1000;

    WeightCardComponent = (
      <WeightCard dateTime={latestDateTime} weight={latestWeight} />
    );
  }

  return (
    <div>
      {LineGraphComponent}
      {WeightCardComponent}
    </div>
  );
};

export default Dashboard;
