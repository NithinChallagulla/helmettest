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

const locations = {
  benz: randomStart(),
  ramesh: randomStart(),
  machavaram: randomStart(),
  eluru: randomStart(),
  suryaraopeta: randomStart(),
};

function render() {
  Object.keys(locations).forEach((k) => {
    document.getElementById(k + "Value").textContent = locations[k] + "%";
    updateColor(document.getElementById(k + "Tile"), locations[k]);
  });
}

render();

/* 🔻 DECAY + CRACKDOWN LOGIC */
setInterval(() => {
  Object.keys(locations).forEach((k) => {
    // normal decay
    locations[k] = clamp(
      locations[k] - (2 + Math.floor(Math.random() * 2))
    );

    // 🚨 gimmick: enforcement kick-in
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
