function clamp(v) {
  return Math.max(0, Math.min(100, v));
}

function updateColor(tile, value) {
  tile.className = "tile";
  if (value < 50) tile.classList.add("danger");
  else if (value < 80) tile.classList.add("warn");
  else tile.classList.add("safe");
}

let benz = 92;
let ramesh = 88;

const benzValue = document.getElementById("benzValue");
const rameshValue = document.getElementById("rameshValue");
const benzTile = document.getElementById("benzTile");
const rameshTile = document.getElementById("rameshTile");

// Decrease every 10s
setInterval(() => {
  benz = clamp(benz - (1 + Math.floor(Math.random() * 3)));
  ramesh = clamp(ramesh - (1 + Math.floor(Math.random() * 3)));

  benzValue.textContent = benz + "%";
  rameshValue.textContent = ramesh + "%";

  updateColor(benzTile, benz);
  updateColor(rameshTile, ramesh);
}, 10000);

// Increase every 25s
setInterval(() => {
  benz = clamp(benz + 4);
  ramesh = clamp(ramesh + 4);

  benzValue.textContent = benz + "%";
  rameshValue.textContent = ramesh + "%";

  updateColor(benzTile, benz);
  updateColor(rameshTile, ramesh);
}, 25000);
