const leftImage = document.querySelector(".left-image");
const mainImage = document.querySelector(".main-image");
const rightImage = document.querySelector(".right-image");
const leftArrow = document.querySelector("left-arrow");
const rightArrow = document.querySelector("right-arrow");

const imageNames = [
  "blueberry-muffin",
  "brownie",
  "dark-roast",
  "espresso-roast",
  "light-roast",
  "mocha",
  "scones",
  "vanilla",
];

const images = imageNames.map((name) => `./images/${name}.jpg`);

const mainIndex = 0;

leftArrow.addEventListener(() => {
  mainIndex = indexLessOne(mainIndex);
  render(mainIndex);
});

rightArrow.addEventListener(() => {
  mainIndex = indexPlusOne(mainIndex);
  render(mainIndex);
});

const indexLessOne = (index) => (index - 1 < 0 ? images.length - 1 : index - 1);

const indexPlusOne = (index) => (index + 1) % 9;

// need a render function that gives the new images to display, calculating with the two above functions
// and putting those in the src of the proper elements
