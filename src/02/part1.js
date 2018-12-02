const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

function countLetters(value) {
  const letterCount = value.split("").reduce((acc, letter) => {
    if (!acc[letter]) acc[letter] = 0;
    acc[letter] += 1;

    return acc;
  }, {});

  const twice = Object.values(letterCount).some(value => value === 2);
  const thrice = Object.values(letterCount).some(value => value === 3);

  return [twice ? 1 : 0, thrice ? 1 : 0];
}

(async function main() {
  const input = await readFile("./input.txt");
  const values = input.toString().split("\n");

  let totalTwice = 0;
  let totalThrice = 0;

  for (const value of values) {
    const [twice, thrice] = countLetters(value);

    totalTwice += twice;
    totalThrice += thrice;
  }

  console.log("checksum", totalTwice * totalThrice);
})();
