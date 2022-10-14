const randomInRange = (min, max) =>
  Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
  );

const POPUP = document.querySelector("#screensaver");
const RING = document.querySelector("svg");
const SCALE = document.querySelector(".dvd__scale");
const SLIDE = document.querySelector(".dvd__slide");
const DVD = document.querySelector(".dvd");
const MOVERS = [SLIDE, SCALE];
const SCREENSAVER_THRESHOLD = 2000;
const BOUNCE_THRESHOLD = 2; // ms between bounces for a cheer. Ideal is 0 for a corner.

let checker;
let screensaverTimeout;
const EVENT_TYPES = [
  "pointermove",
  "keypress",
  "keydown",
  "keyup",
  "scroll",
  "click"
];

const setSaverTimer = () => {
  if (screensaverTimeout) {
    clearTimeout(screensaverTimeout);
    document.body.classList.remove("timing");
  }

  if (!POPUP.matches(":open")) {
    screensaverTimeout = setTimeout(() => {
      document.body.classList.remove("timing");
      POPUP.showPopUp();
    }, SCREENSAVER_THRESHOLD);
    requestAnimationFrame(() => {
      document.body.classList.add("timing");
    });
  }
};

const BOUNCES = {
  dvd__scale: 0,
  dvd__slide: 0
};

const CHEER = new Audio(
  "https://assets.codepen.io/605876/grunt-party--optimised.mp3"
);

const handleBounce = (e) => {
  BOUNCES[e.target.className] = Date.now();
  DVD.style.setProperty("--hue", randomInRange(0, 359));
  const diff = Math.abs(BOUNCES.dvd__scale - BOUNCES.dvd__slide);
  if (diff <= BOUNCE_THRESHOLD) CHEER.play();
};

POPUP.addEventListener("popuphide", () => {
  setSaverTimer();
});

POPUP.addEventListener("popupshow", () => {
  DVD.style.setProperty("--hue", randomInRange(0, 359));
  MOVERS.forEach((el) => {
    const duration = randomInRange(2, 6);
    el.style = `
      --duration: ${duration};
      --delay: ${duration * Math.random()};
    `;
  });
});

MOVERS.forEach((mover) =>
  mover.addEventListener("animationiteration", handleBounce)
);

EVENT_TYPES.forEach((e) => document.body.addEventListener(e, setSaverTimer));

document.body.classList.add("timing");
document.documentElement.style.setProperty(
  "--threshold",
  SCREENSAVER_THRESHOLD
);
setSaverTimer();
