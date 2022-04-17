import React from "react";

import "./Dropdown.css";

const DropdownItem = (props) => {
  return (
    <div className="item" onClick={props.onSelectItem}>
      <div className="text">{props.value}</div>
    </div>
  );
};

const Dropdown = (props) => {
  return (
    <div className="dropdown">
      <div
        className={"button " + (props.isOpen ? "open" : "close")}
        onClick={() => props.onClick()}
      >
        <div className="text">Date</div>
      </div>
      {props.isOpen && (
        <div className="item-container">
          {props.options.map((option) => (
            <DropdownItem
              key={option}
              value={option}
              onSelectItem={() => props.onSelectItem(option)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
