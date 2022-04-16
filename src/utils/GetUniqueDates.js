const GetUniqueDatesFromObj = (data, exceptionDate = []) => {
  const dates = [];

  data.forEach((item) => {
    const date = item.Date;
    if (!dates.includes(date) && !exceptionDate.includes(date)) {
      dates.push(date);
    }
  });

  return dates;
};

export default GetUniqueDatesFromObj;
