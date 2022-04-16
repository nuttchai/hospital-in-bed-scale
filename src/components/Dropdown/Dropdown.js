import React from "react";

import "./Dropdown.css";

const DropdownItem = (props) => {
  return (
    <div className="dropdown-item" onClick={props.onSelectItem}>
      {props.value}
    </div>
  );
};

const Dropdown = (props) => {
  return (
    <div className="container">
      <div className="dropdown-btn" onClick={() => props.onClick()}>
        Date
      </div>
      {props.isOpen && (
        <div>
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
