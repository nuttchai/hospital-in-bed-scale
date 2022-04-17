import React from "react";

const WeightCard = (props) => {
  return (
    <div>
      <div>Latest Weight</div>
      <div>
        {props.weight} {props.weightUnit}
      </div>
      <div>{props.dateTime}</div>
    </div>
  );
};

export default WeightCard;
