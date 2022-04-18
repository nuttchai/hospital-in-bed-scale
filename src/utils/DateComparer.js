import moment from "moment";

export const IsFirstDateSameOrGreaterThanSecondDate = (
  firstDate,
  secondDate,
  format = null
) => {
  let firstDateMoment = firstDate;
  let secondDateMoment = secondDate;

  if (format) {
    firstDateMoment = moment(firstDate, format);
    secondDateMoment = moment(secondDate, format);
  }

  if (secondDateMoment.isAfter(firstDateMoment)) return false;

  return true;
};
