import React, { useMemo } from "react";
import Chart from "react-google-charts";

const LineGraph = (props) => {
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
      title: `Average Patient Weight (${props.date})`,
    }),
    [props.weightUnit, props.date, props.hAxisTitle]
  );

  return (
    <Chart
      width={"700px"}
      height={"410px"}
      chartType="LineChart"
      loader={<div>Loading Chart</div>}
      data={props.lineData}
      options={LineChartOptions}
      rootProps={{ "data-testid": "2" }}
    />
  );
};

LineGraph.defautlProps = {
  hAxisTitle: "Date & Time Interval",
};

export default LineGraph;
