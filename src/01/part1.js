const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

(async function main() {
  const input = await readFile("./input.txt");
  const values = input.toString().split("\n");

  const frequency = values.reduce((acc, value) => acc + Number(value), 0);

  console.log("ending frequency", frequency);
})();
