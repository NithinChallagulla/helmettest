const MAX = 82;
const MIN = 0;

function clamp(v) {
  return Math.max(MIN, Math.min(MAX, v));
}

function randomStart() {
  return Math.floor(70 + Math.random() * 13);
}

function updateColor(tile, value) {
  tile.classList.remove("safe", "warn", "danger");
  if (value < 40) tile.classList.add("danger");
  else if (value < 65) tile.classList.add("warn");
  else tile.classList.add("safe");
}

/* -------- TIME (HOUR ONLY) -------- */
function getCurrentHour() {
  const now = new Date();
  return String(now.getHours()).padStart(2, "0") + ":00";
}

function updateTime() {
  const hour = getCurrentHour();
  Object.keys(locations).forEach((k) => {
    document.getElementById(k + "Time").textContent = hour;
  });
}

/* -------- STATE -------- */
const locations = {
  benz: randomStart(),
  ramesh: randomStart(),
  machavaram: randomStart(),
  eluru: randomStart(),
  suryaraopeta: randomStart(),
};

/* -------- RENDER -------- */
function render() {
  Object.keys(locations).forEach((k) => {
    document.getElementById(k + "Value").textContent = locations[k] + "%";
    updateColor(document.getElementById(k + "Tile"), locations[k]);
  });
  updateTime();
}

render();

/* 🔻 DECAY + CRACKDOWN LOGIC */
setInterval(() => {
  Object.keys(locations).forEach((k) => {
    locations[k] = clamp(
      locations[k] - (2 + Math.floor(Math.random() * 2))
    );

    if (locations[k] < 55) {
      locations[k] = clamp(
        locations[k] + (8 + Math.floor(Math.random() * 3))
      );
    }
  });

  render();
}, 10000);

/* 🔺 SMALL RECOVERY */
setInterval(() => {
  Object.keys(locations).forEach((k) => {
    locations[k] = clamp(locations[k] + 3);
  });

  render();
}, 30000);

/* 💥 MAJOR CREDIBILITY DROP */
setInterval(() => {
  Object.keys(locations).forEach((k) => {
    locations[k] = clamp(locations[k] - 25);
  });

  render();
}, 40 * 60 * 1000);

/* ⏱ Update hour exactly when it changes */
setInterval(updateTime, 60 * 1000);
