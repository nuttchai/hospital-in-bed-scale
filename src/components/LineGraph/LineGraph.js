import React from "react";
import Chart from "react-google-charts";
import RESULT_MOCK from "../../data/ResultMock";

const LineChartOptions = {
  hAxis: {
    title: "Time",
  },
  vAxis: {
    title: "Weight (kg)",
  },
  series: {
    1: { curveType: "function" },
  },
};

const LineGraph = (props) => {
  // const raw = props.data
  const raw = RESULT_MOCK;
  const data = [["x", "Set 1"]];
  const day = "2020-06-01";

  raw.forEach((item) => {
    const result = item.Result;
    result !== "Error" && data.push([item.Time, parseFloat(result) / 1000]);
  });

  console.log(data);

  return (
    <div className="container mt-5 lineChart">
      <h2>Patient Weight ({day})</h2>
      <Chart
        width={"700px"}
        height={"410px"}
        chartType="LineChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={LineChartOptions}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
};

export default LineGraph;
