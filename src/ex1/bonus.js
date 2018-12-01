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
  const input = await readFile("./input.txt", "utf-8");
  const values = input.toString().split("\n");

  let frequency = 0;
  let set = new Set();
  let i = 0;

  while (true) {
    frequency += processFrequency(values[i]);

    if (set.has(frequency)) {
      break;
    }

    i = (i + 1) % values.length;
    set.add(frequency);
  }

  console.log("duplicate frequency", frequency);
})();
