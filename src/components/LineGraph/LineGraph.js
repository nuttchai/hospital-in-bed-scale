import React from "react";
import Chart from "react-google-charts";

const LineGraph = (props) => {
  const LineChartOptions = {
    hAxis: {
      title: props.lineDesc.xAxis,
    },
    vAxis: {
      title: props.lineDesc.yAxis,
    },
    series: {
      1: { curveType: "function" },
    },
  };

  return (
    <div className="container mt-5 lineChart">
      <h2>Patient Weight ({props.lineDesc.date})</h2>
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
