function removeDuplicate(arr) {
  // const unique = [...new Set(arr)];
  // return unique;

  const newArr = arr.reduce((acc, cur) => {
    if (!acc.includes(cur)) acc.push(cur);
    return acc;
  }, []);

  return newArr;

  //   const newArr = arr.filter((el, i, arr) => arr.indexOf(el) === i);
}

// removeDuplicate([1, 2, 2, 3, 3, 3, 4, 5, 5]);
console.log(removeDuplicate([1, 2, 2, 3, 3, 3, 4, 5, 5]));
