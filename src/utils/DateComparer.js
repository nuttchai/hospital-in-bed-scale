import moment from "moment";

export const IsFirstDateSameOrGreaterThanSecondDate = (
  firstDate,
  secondDate,
  format = "DD/MM/YYYY HH:mm"
) => {
  const firstDateMoment = moment(firstDate, format);
  const secondDateMoment = moment(secondDate, format);

  if (secondDateMoment.isAfter(firstDateMoment)) return false;

  return true;
};
