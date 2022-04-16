import React from "react";

const WeightCard = (props) => {
  return (
    <div>
      <div>Latest Weight - {props.dateTime}</div>
      <div>
        {props.weight} {props.weightUnit}
      </div>
    </div>
  );
};

export default WeightCard;
