import "./LineSeparator.css";

const LineSeparator = (props) => {
  const axis = props.isVertical ? "y" : "x";
  const margin = props.isMarginRequired ? "margin-include" : "";
  return <div className={`line-separator ${axis} ${margin}`} />;
};

LineSeparator.defaultProps = {
  isVertical: false,
  isMarginRequired: false,
};

export default LineSeparator;
