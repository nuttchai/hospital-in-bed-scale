import React, { useState, useEffect, useCallback } from "react";

import "./Dashboard.css";
import LineGraph from "../../components/LineGraph/LineGraph";
import WeightCard from "../../components/WeightCard/WeightCard";
import WeightTable from "../../components/WeightTable/WeightTable";
import Light from "../../components/Light/Light";
import Header from "../../components/Header/Header";
import LineSeparator from "../../components/LineSeparator/LineSeparator";
import FilterData from "../../utils/FilterData";
import GetUniqueDates from "../../utils/GetUniqueDates";
import GetLightStatus from "../../utils/GetLightStatus";
import DescriptionText from "../../constants/DescriptionText";
import LightStatus from "../../constants/LightStatus";
import Card from "../../components/Card/Card";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import TitleText from "../../components/TitleText/TitleText";
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
// import { FetchSheetData } from "../../api/SheetAPI";

const weightUnit = DescriptionText.weightUnit || "kg";

const MINUTE_MS = 60000;
const AVERAGE_GIVEN_TIME = {
  VALUE: 24,
  UNIT: "hours",
};

const Dashboard = () => {
  const [sheetData, setSheetData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [unqiueDates, setUniqueDates] = useState([]);
  const [filterOptions, setFilterOptions] = useState({
    type: FILTER_TYPE.LATEST_24_HRS,
    customDate: null,
  });

  const handleDateChange = (dropdownSelection) => {
    const newFilterOption =
      dropdownSelection === DescriptionText.defaultDropdownSelection
        ? { type: FILTER_TYPE.LATEST_24_HRS, customDate: null }
        : { type: FILTER_TYPE.CUSTOM_DATE, customDate: dropdownSelection };

    setFilterOptions(newFilterOption);
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

  useEffect(() => {
    const _uniqueDates = GetUniqueDates(sheetData);
    _uniqueDates.push(DescriptionText.defaultDropdownSelection);

    setUniqueDates(_uniqueDates);
  }, [sheetData]);

  let LineGraphComponent,
    WeightTableComponent,
    LatestWeightComponent,
    AverageWeightComponent,
    date;

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

    LatestWeightComponent = (
      <WeightCard
        className="latest-weight"
        status={lightStatus}
        weight={latestWeight}
        weightUnit={weightUnit}
        title="Latest Weight"
        decsription={`${latestData.Date} ${latestData.Time}`}
      />
    );

    AverageWeightComponent = (
      <WeightCard
        className="average-weight"
        weight={averageWeight}
        weightUnit={weightUnit}
        title="Average Weight"
        decsription={`Last ${AVERAGE_GIVEN_TIME.VALUE} ${AVERAGE_GIVEN_TIME.UNIT}`}
      />
    );

    LightComponent = <Light color={lightStatus.color} />;
  }

  if (filteredData.length > 0) {
    const lineData = FormatToLineData(filteredData, filterOptions);
    const hAxisTitle =
      filterOptions.type === FILTER_TYPE.LATEST_24_HRS
        ? DescriptionText.dateTime
        : DescriptionText.timeOnly;
    date =
      filterOptions.type === FILTER_TYPE.LATEST_24_HRS
        ? DescriptionText.last24Hrs
        : filteredData[0].Date;

    LineGraphComponent = (
      <LineGraph
        lineData={lineData}
        hAxisTitle={hAxisTitle}
        weightUnit={weightUnit}
      />
    );

    WeightTableComponent = (
      <WeightTable data={filteredData} date={date} weightUnit={weightUnit} />
    );
  }

  const dashboardContent =
    sheetData.length > 0 ? (
      <div className="dashboard">
        <Header
          dateOptions={unqiueDates}
          onSelectOption={(value) => handleDateChange(value)}
        />
        <div className="data">
          <div className="column left">
            <Card className="card status">
              <div className="status-header">
                <TitleText className="card-title status-title" title="status" />
                {LightComponent}
              </div>
              <LineSeparator isMarginRequired={true} />
              <div className="status-content">
                {LatestWeightComponent}
                <LineSeparator isMarginRequired={true} isVertical={true} />
                {AverageWeightComponent}
              </div>
            </Card>
          </div>
          <div className="column right">
            <Card className="card line">
              <TitleText
                className="card-title"
                title={`Average Patient Weight (${date})`}
              />
              {LineGraphComponent}
            </Card>
            <Card className="card table" titleClass="card-title">
              {WeightTableComponent}
            </Card>
          </div>
        </div>
      </div>
    ) : (
      <div className="dashboard">
        <Header />
        <LoadingSpinner className="spinner" />
      </div>
    );

  return dashboardContent;
};

export default Dashboard;
