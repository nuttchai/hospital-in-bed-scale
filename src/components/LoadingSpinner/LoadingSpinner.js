import React from "react";
import "./LoadingSpinner.css";

export default function LoadingSpinner(props) {
  return (
    <div className={`spinner-container ${props.className}`}>
      <div className="loading-spinner" />
    </div>
  );
}

LoadingSpinner.defaultProps = {
  className: "",
};
