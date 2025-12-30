const MAX = 82;
const MIN = 0;

function clamp(v) {
  return Math.max(MIN, Math.min(MAX, v));
}

function randomStart() {
  return Math.floor(70 + Math.random() * 13);
}

function updateColor(tile, value) {
  tile.className = "tile massive";
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

const el = {
  benz: ["benzValue", "benzTile"],
  ramesh: ["rameshValue", "rameshTile"],
  machavaram: ["machavaramValue", "machavaramTile"],
  eluru: ["eluruValue", "eluruTile"],
  suryaraopeta: ["suryaraopetaValue", "suryaraopetaTile"],
};

function render() {
  Object.keys(locations).forEach((k) => {
    const [v, t] = el[k];
    document.getElementById(v).textContent = locations[k] + "%";
    updateColor(document.getElementById(t), locations[k]);
  });
}

render();

// small decay
setInterval(() => {
  Object.keys(locations).forEach(
    (k) => (locations[k] = clamp(locations[k] - (2 + Math.floor(Math.random() * 2))))
  );
  render();
}, 10000);

// small recovery
setInterval(() => {
  Object.keys(locations).forEach(
    (k) => (locations[k] = clamp(locations[k] + 3))
  );
  render();
}, 30000);

// major credibility drop
setInterval(() => {
  Object.keys(locations).forEach(
    (k) => (locations[k] = clamp(locations[k] - 25))
  );
  render();
}, 40 * 60 * 1000);
