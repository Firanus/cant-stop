const board = [
  [2, 3],
  [3, 5],
  [4, 7],
  [5, 9],
  [6, 11],
  [7, 13],
  [8, 11],
  [9, 9],
  [10, 7],
  [11, 5],
  [12, 3],
]

// Generate a list of all the combinations of 6 dice rolls.
const combinations = []
for (let i = 0; i < 1296; i++) {
  const first = i % 6 + 1;
  const second = Math.floor(i / 6) % 6 + 1;
  const third = Math.floor(i / 36) % 6 + 1;
  const fourth = Math.floor(i / 216) % 6 + 1;

  combinations.push([first, second, third, fourth]);
}

// Find every pair in each set.
const pairsCombination = [];
for (let i = 0; i < combinations.length; i++) {
  const pairs = [];
  const [first, second, third, fourth] = combinations[i];
  pairs.push([first + second, third + fourth]);
  pairs.push([first + third, second + fourth]);
  pairs.push([first + fourth, second + third]);

  pairsCombination.push(pairs);
}

// Get all unique values from each set.
const uniqueNumbers = [];
for (let i = 0; i < pairsCombination.length; i++) {
  const allNumbers = pairsCombination[i].flatMap(x => x);
  const uniqueNumbersForRoll = allNumbers.filter((item, i, ar) => ar.indexOf(item) === i);
  uniqueNumbers.push(uniqueNumbersForRoll);
}

// Count instances of each unique value

const possibleValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const counts = [];
for (let i = 0; i < possibleValues.length; i++) {
  let value = possibleValues[i];
  let count = 0;

  for (let j = 0; j < uniqueNumbers.length; j++) {
    if (uniqueNumbers[j].indexOf(value) > -1) {
      count++;
    }
  }

  counts.push([value, count / 1296]);
}
console.log(counts);

const weightedCounts = [];
for (let i = 0; i < possibleValues.length; i++) {
  const numberOfSpacesByProbability = 3 * counts[i][1] / counts[0][1];
  weightedCounts.push([possibleValues[i], numberOfSpacesByProbability, numberOfSpacesByProbability / board[i][1]]);
}
console.log(weightedCounts);


const doubleCounts = [];
for (let i = 0; i < possibleValues.length; i++) {
  let value1 = possibleValues[i];

  for (let j = 0; j < possibleValues.length; j++) {
    let value2 = possibleValues[j];
    if (value1 === value2) continue;
    let count = 0;
    for (let k = 0; k < uniqueNumbers.length; k++) {
      if (uniqueNumbers[k].indexOf(value1) > -1 || uniqueNumbers[k].indexOf(value2) > -1) {
        count++;
      }
    }
    doubleCounts.push([value1, value2, count / 1296]);
  }

}

const tripleCounts = [];
for (let i = 0; i < possibleValues.length; i++) {
  let value1 = possibleValues[i];

  for (let j = 0; j < possibleValues.length; j++) {
    let value2 = possibleValues[j];
    if (value1 === value2) continue;

    for (let k = 0; k < possibleValues.length; k++) {
      let value3 = possibleValues[k];
      if (value1 === value3) continue;
      if (value2 === value3) continue;

      let count = 0;
      for (let l = 0; l < uniqueNumbers.length; l++) {
        if (uniqueNumbers[l].indexOf(value1) > -1 || uniqueNumbers[l].indexOf(value2) > -1 || uniqueNumbers[l].indexOf(value3) > -1) {
          count++;
        }
      }
      tripleCounts.push([value1, value2, value3, count / 1296]);
    }
  }

}

const resultToCheck = (i, j, k) => {
  let count = 0;
  for (let l = 0; l < uniqueNumbers.length; l++) {
    if (uniqueNumbers[l].indexOf(i) > -1 || uniqueNumbers[l].indexOf(j) > -1 || uniqueNumbers[l].indexOf(k) > -1) {
      count++;
    }
  }

  console.log(i, j, k, count / 1296)
}
// resultToCheck(12, 2, 3);
// resultToCheck(6, 7, 8);

// Compile a list of all the possible numbers for each one.
// Count the instances of every number from 2-12.