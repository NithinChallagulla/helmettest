function clamp(v) {
  return Math.max(0, Math.min(92, v)); // 🔒 HARD CAP AT 92
}

function updateColor(tile, value) {
  tile.className = "tile massive";
  if (value < 50) tile.classList.add("danger");
  else if (value < 80) tile.classList.add("warn");
  else tile.classList.add("safe");
}

// Random start between 85–92
function randomStart() {
  return Math.floor(85 + Math.random() * 8);
}

let benz = randomStart();
let ramesh = randomStart();

const benzValue = document.getElementById("benzValue");
const rameshValue = document.getElementById("rameshValue");
const benzTile = document.getElementById("benzTile");
const rameshTile = document.getElementById("rameshTile");

// Initial render
benzValue.textContent = benz + "%";
rameshValue.textContent = ramesh + "%";
updateColor(benzTile, benz);
updateColor(rameshTile, ramesh);

// 🔻 Decrease every 10s (1–3%)
setInterval(() => {
  benz = clamp(benz - (1 + Math.floor(Math.random() * 3)));
  ramesh = clamp(ramesh - (1 + Math.floor(Math.random() * 3)));

  benzValue.textContent = benz + "%";
  rameshValue.textContent = ramesh + "%";

  updateColor(benzTile, benz);
  updateColor(rameshTile, ramesh);
}, 10000);

// 🔺 Increase every 25s (+4 but capped at 92)
setInterval(() => {
  benz = clamp(benz + 4);
  ramesh = clamp(ramesh + 4);

  benzValue.textContent = benz + "%";
  rameshValue.textContent = ramesh + "%";

  updateColor(benzTile, benz);
  updateColor(rameshTile, ramesh);
}, 25000);
