function limitByLength(str, maxLength = 100) {
  return str.length > 100 ? str.slice(0, maxLength) + "..." : str;
}

console.log(limitByLength("rolodo", 100));
console.log(
  limitByLength(
    "ut sem nulla pharetra diam sit amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor elit sed vulputate mi sit amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat.",
    100
  )
);
