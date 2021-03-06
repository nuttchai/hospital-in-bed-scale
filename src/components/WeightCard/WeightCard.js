import React from "react";
import LightStatus from "../../constants/LightStatus";

import "./WeightCard.css";

const WeightCard = (props) => {
  const displayedValue = props.weight
    ? `${parseFloat(props.weight).toFixed(2)} ${props.weightUnit}`
    : "-";

  return (
    <div className={`weight-card ${props.className}`}>
      <div className="weight-value" style={{ color: props.status.color }}>
        {displayedValue}
      </div>
      <div className="weight-text">
        <div className="title">{props.title}</div>
        <div className="decsription">{props.decsription}</div>
      </div>
      <div>{props.dateTime}</div>
    </div>
  );
};

WeightCard.defaultProps = {
  status: LightStatus.NORMAL,
  className: "",
};

export default WeightCard;
