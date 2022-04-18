import React from "react";

import "./WeightCard.css";

const WeightCard = (props) => {
  return (
    <div className="weight-card">
      <div className="text-value">
        {props.weight} {props.weightUnit}
      </div>
      <div className="text-desc">Latest Weight</div>
      <div>{props.dateTime}</div>
    </div>
  );
};

export default WeightCard;
