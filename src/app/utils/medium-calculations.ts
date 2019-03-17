export const calcNumOfSteps = (max, step, defNum = 0): number => {
  let acc = defNum;
  let steps = 0;
  while (acc < max) {
    acc = increase(acc, step);
    steps++;
  }
  return steps;
};

export const increase = (acc, num) => acc + num;

export const mediumVoteCalc = (value, amount) => {
  const rounded = Number((value / amount).toFixed(2));
  return isNaN(rounded) ? 0 : rounded;
};
