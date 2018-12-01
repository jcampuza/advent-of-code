const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

function processFrequency(str) {
  const sign = str[0];
  const value = parseInt(str.slice(1));

  if (sign === "-") {
    return -1 * value;
  }

  return value;
}

(async function main() {
  const input = await readFile("./input.txt");
  const values = input.toString().split("\n");

  const frequency = values.reduce(
    (acc, value) => acc + processFrequency(value),
    0
  );

  console.log("ending frequency", frequency);
})();
