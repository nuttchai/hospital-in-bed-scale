const WeightCard = (props) => {
  return (
    <div>
      <div>Latest Weight - {props.dateTime}</div>
      <div>
        {props.weight} {props.weightUnit}
      </div>
    </div>
  );
};

WeightCard.defaultProps = {
  weightUnit: "kg",
};

export default WeightCard;
