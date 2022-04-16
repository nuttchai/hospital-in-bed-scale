import React, { useMemo } from "react";

import Table from "./Table";

const WeightTable = (props) => {
  const columns = useMemo(
    () => [
      {
        Header: `Patient Weight - ${props.date}`,
        columns: [
          {
            Header: "Time",
            accessor: "Time",
          },
          {
            Header: `Weight (${props.weightUnit})`,
            accessor: "Result", // accessor is the "key" in the data, should be the same with the key from Google Sheet
          },
        ],
      },
    ],
    [props.date, props.weightUnit]
  );

  return <Table columns={columns} data={props.data} />;
};

export default WeightTable;
