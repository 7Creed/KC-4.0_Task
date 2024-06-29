function theDate() {
  return new Date();
}

function two() {
  console.log("This is the second function");
}

module.exports = { theDate };
module.exports = theDate;

module.exports.two = two;
