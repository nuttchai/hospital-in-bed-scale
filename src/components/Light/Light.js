import "./Light.css";

const Light = (props) => {
  return (
    <div
      className="light-container"
      style={{ backgroundColor: props.color }}
    ></div>
  );
};

Light.defaultProps = {
  statusColor: "green",
};

export default Light;
