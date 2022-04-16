import React, { useState, useEffect, useCallback } from "react";

import "./Dashboard.css";
import LineGraph from "../../components/LineGraph/LineGraph";
import RESULT_MOCK from "../../data/ResultMock";
import FILTER_TYPE from "../../constants/FilterLineDataType";
import { FormatToLineData } from "../../utils/FormatData";
import { FetchSheetData } from "../../api/SheetAPI";
import FilterData from "../../utils/FilterData";

const Dashboard = () => {
  const [sheetData, setSheetData] = useState([]);
  const [lineData, setLineData] = useState([]);
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
    const filterOptions = { type: FILTER_TYPE.LATEST_24_HRS, customDate: null };
    const filteredData = FilterData(sheetData, filterOptions);
    const lineData = FormatToLineData(filteredData);
    setLineData(lineData);
    setIsFilter(true);
  }, [sheetData]);

  if (!isFilter) {
    return <div>Loading Page...</div>;
  }

  const LineGraphComponent =
    lineData.length > 1 ? (
      <LineGraph lineData={lineData} />
    ) : (
      <div> No Data Shown </div>
    );

  return <div>{LineGraphComponent}</div>;
};

export default Dashboard;
