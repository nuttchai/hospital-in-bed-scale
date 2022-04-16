import React, { useState, useEffect, useCallback } from "react";

import "./Dashboard.css";
import LineGraph from "../../components/LineGraph/LineGraph";
import RESULT_MOCK from "../../data/ResultMock";
import { FetchSheetData } from "../../api/SheetAPI";

const Dashboard = () => {
  const [sheetData, setSheetData] = useState([]);
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

  useEffect(() => {}, [sheetData]);

  return (
    <div>
      <LineGraph />
    </div>
  );
};

export default Dashboard;
