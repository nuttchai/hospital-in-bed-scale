import React from "react";
import TitleText from "../TitleText/TitleText";

import "./Card.css";

const Card = (props) => {
  return (
    <div className={`card-container ${props.className}`} styles={props.styles}>
      {props.title && (
        <TitleText className={props.titleClass} title={props.title} />
      )}
      {props.children}
    </div>
  );
};

Card.defaultProps = {
  className: "",
};

export default Card;
