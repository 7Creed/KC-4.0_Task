const arr1 = ["level", "energy", "update", "king"];
const arr2 = ["liquid", "solid", "gas", "matter"];

function linearSearch(arr, str) {
  return arr.some((st) => st === str)
    ? "Yes, the string exists in the array"
    : "No, the string does not exist in the array";
}

console.log(linearSearch(arr1, "level"));

function linearSearch2(arr, str) {
  for (let i = 0; i < arr2.length; i++) {
    if (arr2[i] === str) {
      return "Yes, the string exists in the array";
    }
  }
  return "No, the string does not exist in the array";
}

console.log(linearSearch2(arr2, "exp"));
