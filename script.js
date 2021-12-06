import Rgb from "./js/rgb.js";
import Hex from "./js/hex.js";
import Hsl from "./js/hsl.js";

const color_grid = document.querySelector(".color-grid");
const color_string = document.querySelector(".color-string");

const results = document.querySelector(".results");
const results_text = document.querySelector("[data-results-text]");
const results_nextBtn = document.querySelector('[data-results-next-btn]');

const COLOR_MAP = {
  rgb: Rgb,
  hex: Hex,
  hsl: Hsl
};

const DIFF_MAP = {
  easy: { maxTolerance: 1, minTolerance: 0.2 },
  medium: { maxTolerance: 0.5, minTolerance: 0.2 },
  hard: { maxTolerance: 0.3, minTolerance: 0.2 },
};

document.addEventListener("change", (e) => {
  if (e.target.matches("input[type=radio]")) render();
});

results_nextBtn.addEventListener('click', () => render());

function render() {
  const format = document.querySelector('[name="format"]:checked').value; // Get format check option
  const difficulty = document.querySelector(
    '[name="difficulty"]:checked'
  ).value; // Get difficulty check option

  const { color_correct, colors } = generateColor(format, difficulty);

  results.classList.add("hide");
  color_string.textContent = color_correct.toCss();

  const colorElements = colors
    .sort(() => Math.random() - 0.5) // Shuffle Colors Array
    .map((color) => {
      const element = document.createElement("button");
      element.style.backgroundColor = color.toCss();
      return { color, element };
    });

  color_grid.innerHTML = "";
  colorElements.forEach(({ color, element }) => {
    element.addEventListener("click", () => {
      results.classList.remove("hide");
      results_text.textContent = color === color_correct ? "Correct" : "Wrong";

      colorElements.forEach(({ color: c, element: e }) => {
        e.disabled = true;
        e.classList.toggle("wrong", c !== color_correct);
      });
    });

    color_grid.append(element);
  });
}

render();

function generateColor(format, difficulty) {
  const colorClass = COLOR_MAP[format];
  const difficultyRules = DIFF_MAP[difficulty];

  const color_correct = colorClass.generate();
  const colors = [color_correct];

  for (let i = 0; i < 5; i++) {
    colors.push(color_correct.generateSimilar(difficultyRules));
  }

  return { color_correct, colors };
}
