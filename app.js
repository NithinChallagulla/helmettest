const MAX = 82;
const MIN = 0;
const STORAGE_KEY = "helmet_obedience_data";

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

/* ---------------- LOAD / SAVE ---------------- */

function loadLocations() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") return parsed;
    }
  } catch (e) {
    console.warn("Storage read failed, resetting.");
  }

  // fallback: first-time random init
  const fresh = {
    benz: randomStart(),
    ramesh: randomStart(),
    machavaram: randomStart(),
    eluru: randomStart(),
    suryaraopeta: randomStart(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

function saveLocations() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(locations));
}

/* ---------------- STATE ---------------- */

const locations = loadLocations();

/* ---------------- RENDER ---------------- */

function render() {
  Object.keys(locations).forEach((k) => {
    document.getElementById(k + "Value").textContent = locations[k] + "%";
    updateColor(document.getElementById(k + "Tile"), locations[k]);
  });
}

render();

/* 🔻 DECAY + ENFORCEMENT GIMMICK */
setInterval(() => {
  Object.keys(locations).forEach((k) => {
    // decay
    locations[k] = clamp(
      locations[k] - (2 + Math.floor(Math.random() * 2))
    );

    // 🚨 crackdown bounce
    if (locations[k] < 55) {
      locations[k] = clamp(
        locations[k] + (8 + Math.floor(Math.random() * 3))
      );
    }
  });

  saveLocations();
  render();
}, 10000);

/* 🔺 SMALL RECOVERY */
setInterval(() => {
  Object.keys(locations).forEach((k) => {
    locations[k] = clamp(locations[k] + 3);
  });

  saveLocations();
  render();
}, 30000);

/* 💥 MAJOR CREDIBILITY DROP */
setInterval(() => {
  Object.keys(locations).forEach((k) => {
    locations[k] = clamp(locations[k] - 25);
  });

  saveLocations();
  render();
}, 40 * 60 * 1000);
