import React from "react";

import "./WeightCard.css";

const WeightCard = (props) => {
  const displayedValue = props.weight
    ? `${parseFloat(props.weight).toFixed(2)} ${props.weightUnit}`
    : "-";

  return (
    <div className="weight-card">
      <div className="text-value">{displayedValue}</div>
      <div className="title">{props.title}</div>
      <div className="decsription">{props.decsription}</div>
      <div>{props.dateTime}</div>
    </div>
  );
};

export default WeightCard;
