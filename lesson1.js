const colors = require("colors");

const arr = process.argv.slice(2);

const params = [];
params.push(Number(arr[0]));
params.push(Number(arr[1]));

let PrimeNumbers = [];
let count = 0;

if (!Number.isInteger(+params[0]) || !Number.isInteger(+params[1])) {
  console.log("Вы ввели не число!");
} else {
  for (let i = params[0]; i <= params[1]; i++) {
    if (params[0] < 2 && params[1] < 2) {
      console.log(colors.red("Простых чисел в диапазоне нет"));
      break;
    } else {
      for (let x = 2; x <= i; x++) {
        if (i % x == 0) {
          count++;
        }
      }
      if (count == 1) {
        PrimeNumbers.push(i);
      }
      count = 0;
    }
  }
}

let countColor = 1;

for (let i = 0; i < PrimeNumbers.length; i++) {
  if (countColor == 4) {
    countColor = 1;
  }

  switch (countColor) {
    case 1:
      console.log(colors.green(PrimeNumbers[i]));
      break;
    case 2:
      console.log(colors.yellow(PrimeNumbers[i]));
      break;
    case 3:
      console.log(colors.red(PrimeNumbers[i]));
      break;
  }
  countColor++;
}
