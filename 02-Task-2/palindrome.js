function palindrome(word) {
  const newWord = word.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  return newWord === [...newWord].reverse().join("");
  //   return [...newWord].reduce((acc, cur) => cur + acc, "") === newWord;
}
