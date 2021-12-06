import { randomNumber, randomValueInRange } from "../utils/utils.js";

const MAX_HUE_VALUE = 360;
const MAX_SATURATION_VALUE = 100;
const MAX_LIGHT_VALUE = 100;

export default class Hsl {
  constructor(h, s, l) {
    this.h = h
    this.s = s;
    this.l = l;
  }

  static generate() {
    return new this(
      Math.floor(randomNumber({ max: MAX_HUE_VALUE })),
      Math.floor(randomNumber({ max: MAX_SATURATION_VALUE })),
      Math.floor(randomNumber({ max: MAX_LIGHT_VALUE }))
    );
  }

  generateSimilar(options) {
    return new this.constructor(
      randomValueInRange({
        startValue: this.h,
        maxCutoff: MAX_HUE_VALUE,
        ...options,
      }),
      randomValueInRange({
        startValue: this.s,
        maxCutoff: MAX_SATURATION_VALUE,
        ...options,
      }),
      randomValueInRange({
        startValue: this.l,
        maxCutoff: MAX_LIGHT_VALUE,
        ...options,
      })
    );
  }

  toCss() {
    return `hsl(${this.h}, ${this.s}%, ${this.l}%)`;
  }
}

