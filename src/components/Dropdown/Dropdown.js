import React from "react";
import { useState } from "react";

import "./Dropdown.css";
import LineSeparator from "../LineSeparator/LineSeparator";
import DescriptionText from "../../constants/DescriptionText";

const DropdownOption = (props) => {
  return (
    <div className="item" onClick={props.onSelectOption}>
      <div className="text">{props.value}</div>
      {!props.isLast && <LineSeparator />}
    </div>
  );
};

const Dropdown = (props) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    DescriptionText.defaultDropdownSelection
  );
  const buttonText =
    selectedOption === DescriptionText.defaultDropdownSelection
      ? DescriptionText.last24Hrs
      : selectedOption;

  return (
    <div className="dropdown">
      <div
        className={"button " + (openDropdown ? "open" : "close")}
        onClick={() => setOpenDropdown(!openDropdown)}
      >
        <div className="text">
          Date:&nbsp;<span className="selectedDate">{buttonText}</span>
        </div>
      </div>
      {openDropdown && (
        <div className="item-container">
          {props.options.map((option, index, array) => {
            const isLastElement = index === array.length - 1;
            return (
              <DropdownOption
                key={option}
                value={option}
                isLast={isLastElement}
                onSelectOption={() => {
                  props.onSelectOption(option);
                  setSelectedOption(option);
                  setOpenDropdown(false);
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
