const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

// Too Lazy to think of the regex :)
function getClaimValues(claim) {
  let [id, _, coords, area] = claim.split(" ");

  id = Number(id.slice(1));
  const [areaX, areaY] = area.split("x").map(Number);
  const [coordX, coordY] = coords
    .slice(0, -1)
    .split(",")
    .map(Number);

  return [id, coordX, coordY, areaX, areaY];
}

function fillArea(value, rect) {
  const [id, coordX, coordY, areaX, areaY] = getClaimValues(value);

  for (let i = coordX; i < coordX + areaX; i++) {
    for (let j = coordY; j < coordY + areaY; j++) {
      if (rect[i][j] === 0) {
        rect[i][j] = id;
      } else {
        rect[i][j] = "X";
      }
    }
  }
}

(async function main() {
  const input = await readFile("./input.txt");
  const values = input.toString().split("\n");
  const rect = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0)
  );

  for (const value of values) {
    fillArea(value, rect);
  }

  let count = 0;
  for (let i = 0; i < rect.length; i++) {
    for (let j = 0; j < rect.length; j++) {
      if (rect[i][j] === "X") count++;
    }
  }

  console.log(count);
})();
