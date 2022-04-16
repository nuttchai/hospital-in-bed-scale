import React, { useState, useEffect, useCallback } from "react";

import "./Dashboard.css";
import LineGraph from "../../components/LineGraph/LineGraph";
import WeightCard from "../../components/WeightCard/WeightCard";
import WeightTable from "../../components/WeightTable/WeightTable";
import Dropdown from "../../components/Dropdown/Dropdown";
import FilterData from "../../utils/FilterData";
import GetUniqueDates from "../../utils/GetUniqueDates";
import DescriptionText from "../../constants/DescriptionText";
import RESULT_MOCK from "../../data/ResultMock";
import FILTER_TYPE from "../../constants/FilterLineDataType";
import { IsWeightVaild } from "../../utils/DataValidator";
import { FormatToLineData } from "../../utils/FormatData";
import { FormatTime } from "../../utils/FormatData";
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
  const [isLoading, setIsLoading] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

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
    const _lineData = FormatToLineData(_filteredData, filterOptions);
    const _unqiueDates = GetUniqueDates(sheetData);
    _unqiueDates.push(defaultDropdownSelection);

    setFilteredData(_filteredData);
    setLineData(_lineData);
    setUnqiueDates(_unqiueDates);
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

  const handleDateChange = (dropdownSelection) => {
    const newFilterOption =
      dropdownSelection === defaultDropdownSelection
        ? { type: FILTER_TYPE.LATEST_24_HRS, customDate: null }
        : { type: FILTER_TYPE.CUSTOM_DATE, customDate: dropdownSelection };

    setFilterOptions(newFilterOption);
    setOpenDropdown(false);
  };

  return (
    <div>
      {LineGraphComponent}
      {WeightCardComponent}
      {WeightTableComponent}
      <Dropdown
        options={unqiueDates}
        onClick={() => setOpenDropdown(!openDropdown)}
        onSelectItem={(value) => handleDateChange(value)}
        isOpen={openDropdown}
      />
    </div>
  );
};

export default Dashboard;
