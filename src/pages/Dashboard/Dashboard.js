import React, { useState, useEffect, useCallback } from "react";

import "./Dashboard.css";
import LineGraph from "../../components/LineGraph/LineGraph";
import WeightCard from "../../components/WeightCard/WeightCard";
import WeightTable from "../../components/WeightTable/WeightTable";
import Dropdown from "../../components/Dropdown/Dropdown";
import Light from "../../components/Light/Light";
import FilterData from "../../utils/FilterData";
import GetUniqueDates from "../../utils/GetUniqueDates";
import GetLightStatus from "../../utils/GetLightStatus";
import DescriptionText from "../../constants/DescriptionText";
import LightStatus from "../../constants/LightStatus";
import RESULT_MOCK from "../../data/ResultMock";
import FILTER_TYPE from "../../constants/FilterLineDataType";
import {
  GetLatestData,
  GetAverageWeightWithinGivenTime,
} from "../../utils/GetLatestData";
import {
  FormatToLineData,
  FormatDataEveryHalfHour,
} from "../../utils/FormatData";
import { FetchSheetData } from "../../api/SheetAPI";

const weightUnit = DescriptionText.weightUnit || "kg";
const defaultDropdownSelection = "default";
const MINUTE_MS = 60000;
const AVERAGE_GIVEN_TIME = {
  VALUE: 24,
  UNIT: "hours",
};

const Dashboard = () => {
  const [sheetData, setSheetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    type: FILTER_TYPE.LATEST_24_HRS,
    customDate: null,
  });

  const handleDateChange = (dropdownSelection) => {
    const newFilterOption =
      dropdownSelection === defaultDropdownSelection
        ? { type: FILTER_TYPE.LATEST_24_HRS, customDate: null }
        : { type: FILTER_TYPE.CUSTOM_DATE, customDate: dropdownSelection };

    setFilterOptions(newFilterOption);
    setOpenDropdown(false);
  };

  const fetchContent = useCallback(async () => {
    try {
      const data = await FetchSheetData();
      // const data = RESULT_MOCK; // Saving Limited Number Of Request
      setSheetData(data);
    } catch (error) {
      console.log(error);
    }
  }, [setSheetData]);

  useEffect(() => {
    fetchContent();
    const interval = setInterval(() => {
      fetchContent();
    }, MINUTE_MS);

    // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    return () => clearInterval(interval);
  }, [fetchContent]);

  useEffect(() => {
    const _filteredData = FormatDataEveryHalfHour(
      FilterData(sheetData, filterOptions)
    );

    setFilteredData(_filteredData);
  }, [sheetData, filterOptions]);

  let LineGraphComponent,
    WeightTableComponent,
    LatestWeightComponent,
    AverageWeightComponent,
    DropdownComponent;
  let LightComponent = <Light color={LightStatus.INACTIVE.color} />;

  if (sheetData.length > 0) {
    const latestData = GetLatestData(sheetData);
    const latestWeight = latestData ? latestData.Result : null;
    const averageWeight = GetAverageWeightWithinGivenTime(
      sheetData,
      AVERAGE_GIVEN_TIME.VALUE,
      AVERAGE_GIVEN_TIME.UNIT
    );
    const lightStatus = GetLightStatus(latestWeight, averageWeight);
    const unqiueDates = GetUniqueDates(sheetData);
    unqiueDates.push(defaultDropdownSelection);

    LatestWeightComponent = (
      <WeightCard
        weight={latestWeight}
        descText="Latest Weight"
        weightUnit={weightUnit}
      />
    );

    AverageWeightComponent = (
      <WeightCard
        weight={averageWeight}
        descText={`Average Weight (Last ${AVERAGE_GIVEN_TIME.VALUE} ${AVERAGE_GIVEN_TIME.UNIT})`}
        weightUnit={weightUnit}
      />
    );

    DropdownComponent = (
      <Dropdown
        options={unqiueDates}
        onClick={() => setOpenDropdown(!openDropdown)}
        onSelectItem={(value) => handleDateChange(value)}
        isOpen={openDropdown}
      />
    );

    LightComponent = <Light color={lightStatus.color} />;
  }

  if (filteredData.length > 0) {
    const lineData = FormatToLineData(filteredData, filterOptions);
    const dateHeader =
      filterOptions.type === FILTER_TYPE.LATEST_24_HRS
        ? DescriptionText.last24Hrs
        : filteredData[0].Date;
    const hAxisTitle =
      filterOptions.type === FILTER_TYPE.LATEST_24_HRS
        ? DescriptionText.dateTime
        : DescriptionText.timeOnly;

    LineGraphComponent = (
      <LineGraph
        lineData={lineData}
        date={dateHeader}
        hAxisTitle={hAxisTitle}
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

  const content =
    sheetData.length > 0 ? (
      <div className="dashboard">
        <div className="column left">
          <div className="content line-graph">{LineGraphComponent}</div>
          <div className="content weight-card">{LatestWeightComponent}</div>
          <div className="content weight-card">{AverageWeightComponent}</div>
        </div>
        <div className="column right">
          <div className="dropdown">{DropdownComponent}</div>
          <div className="content weight-table">{WeightTableComponent}</div>
          <div className="content light">{LightComponent}</div>
        </div>
      </div>
    ) : (
      <div> Loading Data... </div>
    );

  return content;
};

export default Dashboard;
