const imagesContainer = document.querySelector(".images-container");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

/*
 *  CONSTANT VALUES (WOULD CHANGE TO MAKE RESPONSIVE)
 */

const imgContainerWidth = imagesContainer.offsetWidth;
const mainImgWidth = 500;
const sideImgWidth = 210;
const leftImgLeftValue = 80;
const mainImgLeftValue = imgContainerWidth / 2 - mainImgWidth / 2;
const rightImgLeftValue = imgContainerWidth - 80 - sideImgWidth;

/*
 *  CREATE IMAGE ELEMENTS FROM NAMES
 */

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

const imageSrcs = imageNames.map((name) => `./images/${name}.jpg`);

const images = imageSrcs.map((src) => {
  img = document.createElement("img");
  img.src = src;
  return img;
});

/*
 *  ADD IMGS TO THE DOM & SET INITIAL VALUES
 */

const setInitialState = (images) => {
  images.forEach((img) => {
    img.style.width = 0;
    img.style.position = "absolute";
    imagesContainer.appendChild(img);
  });

  let leftImg = images[2];
  let mainImg = images[1];
  let rightImg = images[0];
  mainImg.style.width = mainImgWidth + "px";
  mainImg.style.opacity = "1";
  mainImg.style.left = mainImgLeftValue + "px";
  leftImg.style.width = sideImgWidth + "px";
  leftImg.style.opacity = "0.3";
  leftImg.style.left = leftImgLeftValue + "px";
  rightImg.style.width = sideImgWidth + "px";
  rightImg.style.opacity = "0.3";
  rightImg.style.left = rightImgLeftValue + "px";
};

setInitialState(images);
let mainIndex = 1;

/*
 *  UTILS
 */

const indexLessOne = (index) =>
  index - 1 >= 0 ? index - 1 : indexLessOne(index + images.length);

const indexPlusOne = (index) => (index + 1) % images.length;

function animate({ timing, draw, duration, after }) {
  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    } else {
      after();
    }
  });
}

// const imgContainerWidth = imagesContainer.offsetWidth
// const mainImgWidth = 500
// const sideImgWidth = 210
// const leftImgLeftValue = 80;
// const mainImgLeftValue = imgContainerWidth / 2 - mainImgWidth / 2
// const rightImgLeftValue = imgContainerWidth - 80 - sideImgWidth

function linear(timeFraction) {
  return timeFraction;
}

const rightToLeft = () => {
  const leftIndex = indexPlusOne(mainIndex);
  const rightIndex = indexLessOne(mainIndex);
  const newImgIndex = indexLessOne(rightIndex);
  const newImg = images[newImgIndex];
  const leftImg = images[leftIndex];
  const mainImg = images[mainIndex];
  const rightImg = images[rightIndex];
  animate({
    duration: 500,
    timing: linear,
    draw: function ltr(progress) {
      newImg.style.left =
        (rightImgLeftValue - imgContainerWidth) * progress +
        imgContainerWidth +
        "px";
      newImg.style.width = sideImgWidth * progress + "px";
      newImg.style.opacity = 0.3 * progress;
      leftImg.style.left =
        leftImgLeftValue - leftImgLeftValue * progress + "px";
      leftImg.style.width = sideImgWidth - sideImgWidth * progress + "px";
      leftImg.style.opacity = 0.3 - progress * 0.3;
      mainImg.style.left =
        mainImgLeftValue -
        (mainImgLeftValue - leftImgLeftValue) * progress +
        "px";
      mainImg.style.width =
        (sideImgWidth - mainImgWidth) * progress + mainImgWidth + "px";
      mainImg.style.opacity = -0.7 * progress + 1;
      rightImg.style.left =
        rightImgLeftValue -
        (rightImgLeftValue - mainImgLeftValue) * progress +
        "px";
      rightImg.style.width =
        sideImgWidth + (mainImgWidth - sideImgWidth) * progress + "px";
      rightImg.style.opacity = 0.3 + 0.7 * progress;
    },
    after() {
      mainIndex = indexLessOne(mainIndex);
    },
  });
};

const leftToRight = () => {
  const leftIndex = indexPlusOne(mainIndex);
  const rightIndex = indexLessOne(mainIndex);
  const newImgIndex = indexPlusOne(leftIndex);
  const newImg = images[newImgIndex];
  const leftImg = images[leftIndex];
  const mainImg = images[mainIndex];
  const rightImg = images[rightIndex];
  animate({
    duration: 500,
    timing: linear,
    draw: function ltr(progress) {
      newImg.style.left = leftImgLeftValue * progress + "px";
      newImg.style.width = sideImgWidth * progress + "px";
      newImg.style.opacity = 0.3 * progress;
      leftImg.style.left =
        (mainImgLeftValue - leftImgLeftValue) * progress +
        leftImgLeftValue +
        "px";
      leftImg.style.width =
        (mainImgWidth - sideImgWidth) * progress + sideImgWidth + "px";
      leftImg.style.opacity = 0.7 * progress + 0.3;
      mainImg.style.left =
        (rightImgLeftValue - mainImgLeftValue) * progress +
        mainImgLeftValue +
        "px";
      mainImg.style.width =
        (sideImgWidth - mainImgWidth) * progress + mainImgWidth + "px";
      mainImg.style.opacity = -0.7 * progress + 1;
      rightImg.style.left =
        (imgContainerWidth - rightImgLeftValue) * progress +
        rightImgLeftValue +
        "px";
      rightImg.style.width = sideImgWidth - progress * sideImgWidth + "px";
      rightImg.style.opacity = 0.3 - progress * 0.3;
    },
    after() {
      mainIndex = indexPlusOne(mainIndex);
    },
  });
};

leftArrow.addEventListener("click", rightToLeft);

rightArrow.addEventListener("click", leftToRight);
