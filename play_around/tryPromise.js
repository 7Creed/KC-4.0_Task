const doSomething = new Promise((resolve, reject) => {
  setTimeout(() => {
    return resolve("Hello world!");
    // return reject"Serious error");
  }, 10000);
});

// const doSomethingTwo = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     return resolve("Hello world two");
//   }, 2000);
// });

// console.log(doSomething);

// doSomething
//   .then((val) => {
//     console.log("value: ", val);
//   })
//   .catch((reason) => {
//     console.log("Error: ", reason);
//   });

// doSomethingTwo.then((v) => console.log(v)).catch((err) => console.log(err));

const isNumberEven = (num) => {
  return new Promise((resolve, reject) => {
    if (num % 2 == 0) {
      resolve("Yes, it's even");
    } else {
      reject("No, it's not even");
    }
  });
};

// isNumberEven(19)
//   .then((val) => {
//     console.log("The result: ", val);
//   })
//   .catch((err) => {
//     console.log("There is a problem: ", err);
//   })
//   .finally(() => console.log("Done"));

// //   Simplest way of writing/using a class
// class Ax {
//   get(url, headers) {}
// }
// const axios = new Ax();
// axios.get().then();

async function executePromise() {
  try {
    const result = await isNumberEven(20);
    console.log(result);

    console.log(await doSomething);
  } catch (error) {
    console.error("There is a problem: ", error);
  } finally {
    console.log("Done");
  }
}

executePromise();

// Middlewares

// Client -----> Express API -----> Middleware (if any) -----> Controller 
