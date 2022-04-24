import React from "react";
import TitleText from "../TitleText/TitleText";

import "./EmptyContent.css";

const EmptyContent = () => {
  return (
    <div className="empty-content">
      <TitleText title="No data shown" className="text" />
    </div>
  );
};

export default EmptyContent;
