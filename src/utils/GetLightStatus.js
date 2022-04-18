import LightStatus from "../constants/LightStatus";

const GetLightStatus = (latestWeight, averageWeight) => {
  if (!latestWeight || !averageWeight) return LightStatus.NORMAL;

  const latestWeightFormat = parseFloat(latestWeight);
  const averageWeightFormat = parseFloat(averageWeight);
  const diffAbs = Math.abs(latestWeightFormat - averageWeightFormat);

  if (diffAbs < 0.5) {
    return LightStatus.NORMAL;
  } else if (diffAbs < 1) {
    return LightStatus.WARNING;
  }

  return LightStatus.CRITICAL;
};

export default GetLightStatus;
