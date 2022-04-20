import Dropdown from "../Dropdown/Dropdown";
import "./Header.css";

const Header = (props) => {
  return (
    <div className="header">
      <div className="content">
        <div className="left">
          <img
            className="icon"
            src={require("../../assets/icons/dashboard.png")}
            alt="logo"
          />
          <div className="text">
            Dashboard <span className="scale-data">Scale Data</span>
          </div>
        </div>
        {props.dateOptions && (
          <div className="right">
            <Dropdown
              options={props.dateOptions}
              onSelectOption={props.onSelectOption}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Header.defaultProps = {
  onSelectOption: (option) => console.log("onSelectOption not defined"),
};

export default Header;
