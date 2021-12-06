import { randomNumber, randomValueInRange } from "../utils/utils.js";

const MAX_RGB_VALUE = 255;

export default class Rgb {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  static generate() {
    return new this(
      Math.floor(randomNumber({ max: MAX_RGB_VALUE })),
      Math.floor(randomNumber({ max: MAX_RGB_VALUE })),
      Math.floor(randomNumber({ max: MAX_RGB_VALUE }))
    );
  }

  generateSimilar(options) {
    return new this.constructor(
      randomValueInRange({
        startValue: this.r,
        maxCutoff: MAX_RGB_VALUE,
        ...options,
      }),
      randomValueInRange({
        startValue: this.g,
        maxCutoff: MAX_RGB_VALUE,
        ...options,
      }),
      randomValueInRange({
        startValue: this.b,
        maxCutoff: MAX_RGB_VALUE,
        ...options,
      })
    );
  }

  toCss() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }
}