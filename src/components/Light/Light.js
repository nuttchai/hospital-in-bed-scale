import "./Light.css";

const Light = (props) => {
  return <div className="light" style={{ backgroundColor: props.color }} />;
};

Light.defaultProps = {
  statusColor: "green",
};

export default Light;
