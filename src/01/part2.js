const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

(async function main() {
  const input = await readFile("./input.txt", "utf-8");
  const values = input.toString().split("\n");

  let frequency = 0;
  let set = new Set([frequency]);
  let i = 0;

  while (true) {
    frequency += Number(values[i]);

    if (set.has(frequency)) {
      break;
    }

    i = (i + 1) % values.length;
    set.add(frequency);
  }

  console.log("duplicate frequency", frequency);
})();
