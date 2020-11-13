export const roundToHighestDecimal = (num: number) => {
  const numberOfDecimals = num.toFixed(0).toString().length;
  const rounder = Math.pow(10, numberOfDecimals);
  return Math.ceil(num / rounder) * rounder;
};
