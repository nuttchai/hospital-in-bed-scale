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

  let LightComponent = (
    <div className="content light">
      <Light color={LightStatus.INACTIVE.color} />
    </div>
  );

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
      <div className="content weight-card">
        <WeightCard
          weight={latestWeight}
          weightUnit={weightUnit}
          title="Latest Weight"
          decsription={`${latestData.Date} ${latestData.Time}`}
        />
      </div>
    );

    AverageWeightComponent = (
      <div className="content weight-card">
        <WeightCard
          weight={averageWeight}
          weightUnit={weightUnit}
          title="Average Weight"
          decsription={`Last ${AVERAGE_GIVEN_TIME.VALUE} ${AVERAGE_GIVEN_TIME.UNIT}`}
        />
      </div>
    );

    DropdownComponent = (
      <Dropdown
        options={unqiueDates}
        onClick={() => setOpenDropdown(!openDropdown)}
        onSelectItem={(value) => handleDateChange(value)}
        isOpen={openDropdown}
      />
    );

    LightComponent = (
      <div className="content light">
        <Light color={lightStatus.color} />
      </div>
    );
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

    LineGraphComponent = lineData.length > 1 && (
      <div className="content line-graph">
        <LineGraph
          lineData={lineData}
          date={dateHeader}
          hAxisTitle={hAxisTitle}
          weightUnit={weightUnit}
        />
      </div>
    );

    WeightTableComponent = (
      <div className="content weight-table">
        <WeightTable
          data={filteredData}
          date={dateHeader}
          weightUnit={weightUnit}
        />
      </div>
    );
  }

  const content =
    sheetData.length > 0 ? (
      <div className="dashboard">
        <div className="column left">
          {LineGraphComponent}
          {LatestWeightComponent}
          {AverageWeightComponent}
        </div>
        <div className="column right">
          {DropdownComponent}
          {WeightTableComponent}
          {LightComponent}
        </div>
      </div>
    ) : (
      <div> Loading Data... </div>
    );

  return content;
};

export default Dashboard;
