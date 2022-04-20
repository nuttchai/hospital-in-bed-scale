import "./TitleText.css";

const TitleText = (props) => {
  return <div className={`title-text ${props.className}`}>{props.title}</div>;
};

TitleText.defaultProps = {
  className: "",
};

export default TitleText;
