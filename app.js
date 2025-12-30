// ---------------- CONFIG ----------------
const MAX_VALUE = 82;
const MIN_VALUE = 0;

// Clamp helper
function clamp(v) {
  return Math.max(MIN_VALUE, Math.min(MAX_VALUE, v));
}

// Tile color logic
function updateColor(tile, value) {
  tile.className = "tile massive";
  if (value < 40) tile.classList.add("danger");
  else if (value < 65) tile.classList.add("warn");
  else tile.classList.add("safe");
}

// Random believable start (70–82)
function randomStart() {
  return Math.floor(70 + Math.random() * 13);
}

// ---------------- LOCATIONS ----------------
const locations = {
  benz: randomStart(),
  ramesh: randomStart(),
  machavaram: randomStart(),
  eluru: randomStart(),
  suryaraopeta: randomStart(),
};

const elements = {
  benz: {
    value: document.getElementById("benzValue"),
    tile: document.getElementById("benzTile"),
  },
  ramesh: {
    value: document.getElementById("rameshValue"),
    tile: document.getElementById("rameshTile"),
  },
  machavaram: {
    value: document.getElementById("machavaramValue"),
    tile: document.getElementById("machavaramTile"),
  },
  eluru: {
    value: document.getElementById("eluruValue"),
    tile: document.getElementById("eluruTile"),
  },
  suryaraopeta: {
    value: document.getElementById("suryaraopetaValue"),
    tile: document.getElementById("suryaraopetaTile"),
  },
};

// Initial render
function renderAll() {
  Object.keys(locations).forEach((key) => {
    const val = locations[key];
    elements[key].value.textContent = val + "%";
    updateColor(elements[key].tile, val);
  });
}
renderAll();

// ---------------- BEHAVIOUR ----------------

// 🔻 Small decay every 10s (−2 to −3%)
setInterval(() => {
  Object.keys(locations).forEach((key) => {
    locations[key] = clamp(
      locations[key] - (2 + Math.floor(Math.random() * 2))
    );
  });
  renderAll();
}, 10000);

// 🔺 Small recovery every 30s (+3%)
setInterval(() => {
  Object.keys(locations).forEach((key) => {
    locations[key] = clamp(locations[key] + 3);
  });
  renderAll();
}, 30000);

// 🚨 Major credibility drop every 40 minutes (−25%)
setInterval(() => {
  Object.keys(locations).forEach((key) => {
    locations[key] = clamp(locations[key] - 25);
  });
  renderAll();
}, 40 * 60 * 1000);
