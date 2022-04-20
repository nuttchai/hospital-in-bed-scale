import React, { useMemo } from "react";
import Chart from "react-google-charts";

import "./LineGraph.css";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const calculateWidth = (width) => {
  return width >= 1084
    ? 700
    : width < 1084 && width >= 450
    ? width / 1.05 - 50
    : width < 449 && width >= 400
    ? 360
    : 320;
};
const calculateHeight = (calculatedWidth) => (calculatedWidth * 410) / 700;
const unit = "px";

const LineGraph = (props) => {
  const width = useWindowDimensions().width;
  const calculatedWidth = calculateWidth(width);
  const calculatedHeight = calculateHeight(calculatedWidth);
  const LineChartOptions = useMemo(
    () => ({
      hAxis: {
        title: props.hAxisTitle,
      },
      vAxis: {
        title: `Weight (${props.weightUnit})`,
      },
      series: {
        1: { curveType: "function" },
      },
      backgroundColor: "transparent",
      legend: { position: "none" },
    }),
    [props.weightUnit, props.hAxisTitle]
  );

  return (
    <div className="chart-container">
      <Chart
        width={calculatedWidth + unit}
        height={calculatedHeight + unit}
        chartType="LineChart"
        loader={<LoadingSpinner className="chart-spinner" />}
        data={props.lineData}
        options={LineChartOptions}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

LineGraph.defautlProps = {
  hAxisTitle: "Date & Time Interval",
};

export default LineGraph;
