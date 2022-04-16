import React from "react";
import Chart from "react-google-charts";

import { LINE_CHART_DESCRIPTION } from "../../constants/DescriptionText";

const LineGraph = (props) => {
  const LineChartOptions = {
    hAxis: {
      title: props.lineDescription.xAxis,
    },
    vAxis: {
      title: props.lineDescription.yAxis,
    },
    series: {
      1: { curveType: "function" },
    },
  };

  return (
    <div className="container mt-5 lineChart">
      <h2>Patient Weight ({props.lineDescription.date})</h2>
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

LineGraph.defaultProps = {
  lineData: [["x", "Set 1"]],
  lineDescription: LINE_CHART_DESCRIPTION.LATEST_24_HRS,
};

export default LineGraph;
