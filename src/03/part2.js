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

function fillRect(value, rect) {
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

function rectHasNoOverlappingClaims(value, rect) {
  const [id, coordX, coordY, areaX, areaY] = getClaimValues(value);

  let overlaps = false;

  for (let i = coordX; i < coordX + areaX; i++) {
    for (let j = coordY; j < coordY + areaY; j++) {
      if (rect[i][j] !== id) {
        overlaps = true;
      }
    }
  }

  return overlaps === false;
}

(async function main() {
  const input = await readFile("./input.txt");
  const claims = input.toString().split("\n");
  const rect = Array.from({ length: 1000 }, () =>
    Array.from({ length: 1000 }, () => 0)
  );

  for (const claim of claims) {
    fillRect(claim, rect);
  }

  for (const claim of claims) {
    if (rectHasNoOverlappingClaims(claim, rect)) {
      console.log(claim);
      break;
    }
  }
})();
