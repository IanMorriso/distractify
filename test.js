function getRandomValueOutsideRange(min, max) {
    // Get a random value between 0 and 1
    let randomValue = Math.random();
  
    // Calculate the range of values outside the given range
    let rangeOutside = (1 - (max - min)) * randomValue;
  
    // Adjust the range to start from the minimum value
    let adjustedRange = rangeOutside + min;
    console.log(randomValue)
    return adjustedRange;
  }
  
// Example usage: get a random value outside the range [5, 15]
let randomValue = getRandomValueOutsideRange(0, 456);
console.log(randomValue);
  