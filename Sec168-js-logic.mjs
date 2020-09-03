// First, start off by reading this article: https://medium.freecodecamp.org/how-to-think-like-a-programmer-lessons-in-problem-solving-d1d8bf1de7d2

// Question 1: Clean the room function: given an input of [1,2,4,591,392,391,2,5,10,2,1,1,1,20,20], make a function that organizes these into individual array that is ordered. For example answer(ArrayFromAbove) should return: [[1,1,1,1],[2,2,2], 4,5,10,[20,20], 391, 392,591]. Bonus: Make it so it organizes strings differently from number types. i.e. [1, "2", "3", 2] should return [[1,2], ["2", "3"]]

let inputArr = [1, 2, 4, 591, 392, 391, 2, 5, 10, 2, 1, 1, 1, 20, 20];
let mixedInputArr = [
  1,
  2,
  "4",
  591,
  392,
  "391",
  2,
  5,
  10,
  2,
  "1",
  1,
  1,
  "20",
  20,
];

//Function to put array in ascending numerical order:
let orderArr = (arr) => arr.sort((a, b) => a - b);

//Function to check string vs integer:
let typeSort = (arr) => {
  let typeArr = []; //Placeholder for array of segregated types
  let intArr = []; //Placeholder for array of integers
  let strArr = []; //Placeholder for array of strings
  let flatArr = arr.flat(100); //Flatten any nested arrays
  // 1. Filter the array: push integers to one array, and strings to another:
  flatArr.filter((el) =>
    Number.isInteger(el) ? intArr.push(el) : strArr.push(el)
  );
  // 2. Push the two arrays to the parent array:
  typeArr.push(intArr);
  typeArr.push(strArr);
  return typeArr;
};

//Function to match and return digits:
let matchNum = (arr) => {
  //1. Assign variable to first digit of the array:
  let checkNum = arr[0];
  //2. Find the index of the last matching digit (array will be in ascending order, so all other matching digits will be between these two indices). lastIndexOf uses strict comparison, so strings and numbers shouldn't match:
  let lastMatchIndex = arr.lastIndexOf(checkNum);
  //3. Return the matching digits or, if no matches, just the first digit.
  return lastMatchIndex > 0 ? arr.splice(0, lastMatchIndex + 1) : arr.shift();
};

//Function to iterate the matchNum function over the array:
let matchAll = (arr) => {
  let orgArr = []; //Placeholder for final organized array.
  //1. Put array in ascending numerical order, thereby grouping the numbers.
  let orderedArr = orderArr(arr);
  //2. Loop the matchNum function over the array until there are no digits left in the orginal array:
  while (orderedArr.length > 0) {
    //3. Push the returned digits to the organized array:
    orgArr.push(matchNum(orderedArr));
  }
  //4. Return final organized array
  return orgArr;
};

//Function to match by value, then seperate by type:
let matchNumType = (arr) => typeSort(matchAll(arr));

// Question 2: Write a javascript function that takes an array of numbers and a target number. The function should find two different numbers in the array that, when added together, give the target number. For example: answer([1,2,3], 4)should return [1,3]

let findAddends = (arr, target) => {
  let addends = [];
  //1. using target - x === y, where x is the value of arr[i], search the array for y;
  while (arr.length > 0) {
    let findNum = target - arr[0];
    //a. Remove the first number being tested:
    let holdNum = arr.splice(0, 1);
    //b. Find the neccessary addend to the first number:
    if (arr.includes(findNum)) {
      //c. Remove=  the second number so it isn't used again
      let foundNum = arr.splice(arr.indexOf(findNum), 1);
      //2. Push addends to final array:
      addends.push(Array.of(holdNum, foundNum));
    } else {
      //If no number completes the sum, continue on to the next iteration:
      continue;
    }
  }
  return addends;
};

// Question 3: Write a function that converts HEX to RGB. Then Make that function auto-dect the formats so that if you enter HEX color format it returns RGB and if you enter RGB color format it returns HEX.

//1. Test RGB/HEX
//a. RGB begins with rgb followed by () containing with 3 values, divided by spaces and/or commas;
//b. HEX begins with a # and is either 3 or 6 numbers without any division
let which = (str) => str.includes("#");

//2. If HEX
//Function to split hex into 3 values:
let splitHex = (str) => {
  if (str.length === 4) {
    let [r, g, b] = str.match(/[A-F0-9]{1}/gi);
    return [r + r, g + g, b + b];
  }
  if (str.length === 7) {
    return str.match(/[A-F0-9]{2}/gi);
  }
};

//Convert each value to base 10
let parseHex = (num) => parseInt(num, 16);

//3. If RGB
//First seperate the values:
let splitRGB = (rgb) => rgb.match(/\b[0-9]{1,3}\b/g);

//Convert to base 16
let parseRGB = (num) => {
  //Turn the string to an integer in base 10 in order to turn it to a string in base 16...yeah...
  let integer = parseInt(num, 10);
  return integer.toString(16);
};

//Complete conversion function: enter either format and return the other
let convert = (str) => {
  if (which(str) === true) {
    //HEX -> RGB
    let split = splitHex(str);
    let [r, g, b] = split.map(parseHex);
    return `rgb(${r}, ${g}, ${b})`;
  } else {
    //RGB -> HEX
    let split = splitRGB(str);
    let [r, g, b] = split.map(parseRGB);
    return `#${r}${g}${b}`;
  }
};
