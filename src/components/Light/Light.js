import "./Light.css";

const Light = (props) => {
  return (
    <div
      className="light-container"
      style={{ "background-color": props.statusColor }}
    ></div>
  );
};

Light.defaultProps = {
  statusColor: "green",
};

export default Light;
