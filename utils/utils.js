export function randomNumber({ min = 0, max }) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateRange({ startValue, maxCutoff, maxTolerance, minTolerance }) {
  const maxToleranceIncrement = Math.floor(maxTolerance * maxCutoff);
  const minToleranceIncrement = Math.ceil(minTolerance * maxCutoff);

  const aboveRangeMin = startValue + minToleranceIncrement;
  const aboveRangeMax = Math.min(startValue + maxToleranceIncrement, maxCutoff);

  const belowRangeMin = Math.max(startValue - maxToleranceIncrement, 0);
  const belowRangeMax = startValue - minToleranceIncrement;

  const ranges = [];
  if (aboveRangeMax > aboveRangeMin) {
    ranges.push({ min: aboveRangeMin, max: aboveRangeMax });
  }

  if (belowRangeMax > belowRangeMin) {
    ranges.push({ min: belowRangeMin, max: belowRangeMax });
  }
  return ranges;
}

export function randomValueInRange(options) {
  const ranges = validateRange(options); // Give Range of Posible R Values

  const range = ranges[randomNumber({ max: ranges.length - 1 })]; // Give Random Range
  return randomNumber(range);
}
