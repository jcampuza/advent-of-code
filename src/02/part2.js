const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

function hasExactLetterDifference(a, b, difference = 1) {
  if (difference === 0 && a === b) {
    return true;
  }

  if (a.length === b.length) {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        difference--;
        if (difference < 0) {
          return false;
        }
      }
    }
  }

  if (difference === 0) {
    return true;
  }

  return false;
}

function getEntriesWithOneLetterDifference(values) {
  for (let i = 0; i < values.length; i++) {
    for (let j = i + 1; j < values.length; j++) {
      const match = hasExactLetterDifference(values[i], values[j], 1);

      if (match) {
        return [values[i], values[j]];
      }
    }
  }

  return [];
}

function getCommonLetters(a = "", b = "") {
  const common = [];

  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) common.push(a[i]);
  }

  return common.join("");
}

(async function main() {
  const input = await readFile("./input.txt");
  const values = input.toString().split("\n");

  const [a, b] = getEntriesWithOneLetterDifference(values);
  const commonLetters = getCommonLetters(a, b);

  console.log("Letters in common", commonLetters);
})();
