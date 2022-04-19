import "./Light.css";

const Light = (props) => {
  return (
    <div className="light-container">
      <div className="text">Status</div>
      <div className="light" style={{ backgroundColor: props.color }} />
    </div>
  );
};

Light.defaultProps = {
  statusColor: "green",
};

export default Light;
