import React, { useMemo } from "react";
import Chart from "react-google-charts";

const LineGraph = (props) => {
  const LineChartOptions = useMemo(
    () => ({
      hAxis: {
        title: "Date & Time",
      },
      vAxis: {
        title: `Weight (${props.weightUnit})`,
      },
      series: {
        1: { curveType: "function" },
      },
    }),
    [props.weightUnit]
  );

  return (
    <div className="container mt-5 lineChart">
      <h2>Patient Weight ({props.date})</h2>
      <Chart
        width={"700px"}
        height={"410px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={props.lineData}
        options={LineChartOptions}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

export default LineGraph;
