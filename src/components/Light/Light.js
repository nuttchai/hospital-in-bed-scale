import "./Light.css";

const Light = (props) => {
  return (
    <div
      className="light-container"
      style={{ "background-color": props.color }}
    ></div>
  );
};

Light.defaultProps = {
  statusColor: "green",
};

export default Light;
