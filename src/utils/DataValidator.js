const isFloat = (n) => {
  return parseFloat(n.match(/^-?\d*(\.\d+)?$/)) > 0;
};

export const IsWeightVaild = (weight) => {
  return weight !== "Error" && isFloat(weight);
};
