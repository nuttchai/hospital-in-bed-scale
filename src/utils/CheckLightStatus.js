import LightStatus from "../constants/LightStatus";
import { IsFirstDateSameOrGreaterThanSecondDate } from "./DateComparer";

const CheckLightStatus = (latestData, latestDataWithCompleteAverage) => {
  if (!latestData || !latestDataWithCompleteAverage) return LightStatus.NORMAL;

  if (
    IsFirstDateSameOrGreaterThanSecondDate(
      `${latestDataWithCompleteAverage.Date} ${latestDataWithCompleteAverage.Time}`,
      `${latestData.Date} ${latestData.Time}`
    )
  )
    return LightStatus.NORMAL;

  const latestWeight = parseFloat(latestData.Result);
  const latestCompleteAverage = parseFloat(
    latestDataWithCompleteAverage.Result
  );

  const diffAbs = Math.abs(latestWeight - latestCompleteAverage);

  if (diffAbs < 0.5) {
    return LightStatus.NORMAL;
  } else if (diffAbs < 1) {
    return LightStatus.WARNING;
  }

  return LightStatus.CRITICAL;
};

export default CheckLightStatus;
