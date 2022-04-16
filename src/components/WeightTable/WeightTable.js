import React, { useMemo } from "react";

import Table from "./Table";
import DescriptionText from "../../constants/DescriptionText";

const WeightTable = (props) => {
  const columns = useMemo(() => {
    const columnConfig = [
      {
        Header: "Time",
        accessor: "Time",
      },
      {
        Header: `Weight (${props.weightUnit})`,
        accessor: "Result", // accessor is the "key" in the data, should be the same with the key from Google Sheet
      },
    ];

    if (props.date === DescriptionText.last24Hrs)
      // Add date to the first column
      columnConfig.unshift({ Header: "Date", accessor: "Date" });

    return [
      {
        Header: `Patient Weight - ${props.date}`,
        columns: columnConfig,
      },
    ];
  }, [props.date, props.weightUnit]);

  return <Table columns={columns} data={props.data} />;
};

export default WeightTable;
