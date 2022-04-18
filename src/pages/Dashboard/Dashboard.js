import React, { useState, useEffect, useCallback } from "react";

import "./Dashboard.css";
import LineGraph from "../../components/LineGraph/LineGraph";
import WeightCard from "../../components/WeightCard/WeightCard";
import WeightTable from "../../components/WeightTable/WeightTable";
import Dropdown from "../../components/Dropdown/Dropdown";
import Light from "../../components/Light/Light";
import FilterData from "../../utils/FilterData";
import GetUniqueDates from "../../utils/GetUniqueDates";
import CheckLightStatus from "../../utils/CheckLightStatus";
import DescriptionText from "../../constants/DescriptionText";
import RESULT_MOCK from "../../data/ResultMock";
import FILTER_TYPE from "../../constants/FilterLineDataType";
import {
  GetLatestData,
  GetLatestDataWithCompleteAverage,
} from "../../utils/GetLatestData";
import {
  FormatToLineData,
  FormatDataEveryHalfHour,
} from "../../utils/FormatData";
import { FetchSheetData } from "../../api/SheetAPI";

const weightUnit = DescriptionText.weightUnit || "kg";
const defaultDropdownSelection = "default";

const Dashboard = () => {
  const [sheetData, setSheetData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    type: FILTER_TYPE.LATEST_24_HRS,
    customDate: null,
  });
  const [unqiueDates, setUnqiueDates] = useState([]);
  const [filteredDataWithLast24Hrs, setFilteredDataWithLast24Hrs] = useState(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

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
    const _filteredData = FilterData(sheetData, filterOptions);
    const _formattedData = FormatDataEveryHalfHour(_filteredData);
    const _lineData = FormatToLineData(_formattedData, filterOptions);
    const _unqiueDates = GetUniqueDates(sheetData);
    _unqiueDates.push(defaultDropdownSelection);

    setFilteredData(_formattedData);
    setLineData(_lineData);
    setUnqiueDates(_unqiueDates);
    setIsLoading(true);
  }, [sheetData, filterOptions]);

  useEffect(() => {
    const _filteredDataWithLast24Hrs = FilterData(sheetData, {
      type: FILTER_TYPE.LATEST_24_HRS,
      customDate: null,
    });
    const _formattedDataWithLast24Hrs = FormatDataEveryHalfHour(
      _filteredDataWithLast24Hrs
    );

    setFilteredDataWithLast24Hrs(_formattedDataWithLast24Hrs);
  }, [sheetData]);

  if (!isLoading) {
    return <div>Loading Data...</div>;
  }

  let LineGraphComponent,
    WeightCardComponent,
    WeightTableComponent,
    LightComponent;

  if (filteredData.length > 0) {
    const latestData = GetLatestData(sheetData);
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

    WeightCardComponent = latestData.Result && (
      <WeightCard weight={latestData.Result} weightUnit={weightUnit} />
    );

    const latestDataWithCompleteAverage = GetLatestDataWithCompleteAverage(
      filteredDataWithLast24Hrs
    );
    const lightStatus = CheckLightStatus(
      latestData,
      latestDataWithCompleteAverage
    );

    LightComponent = <Light color={lightStatus.color} />;
  }

  return (
    <div className="dashboard">
      <div className="column left">
        <div className="content line-graph">{LineGraphComponent}</div>
        <div className="content weight-card">{WeightCardComponent}</div>
      </div>
      <div className="column right">
        <Dropdown
          options={unqiueDates}
          onClick={() => setOpenDropdown(!openDropdown)}
          onSelectItem={(value) => handleDateChange(value)}
          isOpen={openDropdown}
        />
        <div className="content weight-table">{WeightTableComponent}</div>
        <div className="content light">{LightComponent}</div>
      </div>
    </div>
  );
};

export default Dashboard;
