/*
// CLASS 1
const { a, greetEveryone } = require("./file");
// const { theDate } = require("./utilities/getTheDate");

const w = require("./utilities/getTheDate");

console.log("I imported the value", a);

greetEveryone();

// const todaysDate = theDate();
const todaysDate = w();

console.log(todaysDate);

w.two();
*/

/*
// CLASS 2
const express = require("express");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(function (request, response, next) {
  console.log(request.protocol, request.url, request.method);
  next();
});

// Writing routes
server.get("/", function (request, response) {
  response.send("Hellloooo people");
});
server.get("/about", function (request, response) {
  response.send("This is the about page");
});
server.post("/login", function (req, res) {
  console.log("request body: ", req.body);
  console.log("Content type: ", req.headers["content-type"]);
  //   res.send("You sent a request");
  res.json({ isSuccessful: true, message: "Logged in succesful" });
});
server.get("/add/:val1/:val2", function (req, res) {
  const result = parseInt(req.params.val1) + parseInt(req.params.val2);
  res.send("The result is " + result);
});
server.listen(3000, function () {
  console.log("Server is up");
});
*/

/*
// CLASS 3
const express = require("express");
const logger = require("morgan");
const uid = require("uuid");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Instead of this we can use morgan as a logger to get the details of a request or response
// server.use(function (request, response, next) {
//   console.log(request.protocol, request.url, request.method);
//   next();
// });

server.use(logger("dev")); //we also have "combined", "common" etc

// CRUD Operations
let products = [];

server.get("/products", (req, res) => {
  res.send(products);
});

server.post("/product", (req, res) => {
  const productDetails = req.body;
  const id = uid.v4();

  products.push({
    id,
    name: productDetails.name,
    price: productDetails.price,
  });
  res.send("Product added successfully");
});

server.get("/product/:id", (req, res) => {
  const productId = req.params.id;
  const productDetails = products.find((product) => product.id === productId);

  res.send(productDetails);
});

// Start from here
// PUT endpoint to change the title and body of a task
server.put("/product/:id", (req, res) => {
  const updatedProductDetails = req.body;
  const productId = req.params.id;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === productId) {
      products[i].name = updatedProductDetails.name;
      products[i].price = updatedProductDetails.price;
    }
    // else {
    //   res.status(404).json({ message: "Task not found" });
    // }
  }
  res.send("Product updated successfully");
});

server.delete("/product/:id", (req, res) => {
  const productId = req.params.id;
  products = products.filter((product) => product.id !== productId);
  res.send("Record deleted");
});

server.listen(3000, function () {
  console.log("Server is up");
});
*/

/*
// CLASS 4
// After installing mongoDb
const express = require("express");
const logger = require("morgan");
const uid = require("uuid");
const mongoose = require("mongoose");
// installing bcrypt for hashing passwords
const bcrypt = require("bcrypt");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(logger("dev"));

const connection = mongoose.connect("mongodb://localhost:27017/kodecamp4");
connection
  .then(() => {
    console.log("Connected successfully to mongodb");
  })
  .catch((error) => {
    console.log("An error occurred while trying to connect. Error: ", error);
  });

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productCollection = mongoose.model("products", productSchema);

server.post("/product", async (req, res) => {
  const productDetails = req.body;
  await productCollection.create({
    productName: productDetails.productName,
    productPrice: productDetails.productPrice,
  });

  res.send({
    message: "Product created successfully",
  });
});

server.put("/product/:id", async (req, res) => {
  const productDetails = req.body;
  await productCollection.findByIdAndUpdate(req.params.id, {
    productName: productDetails.productName,
    productPrice: productDetails.productPrice,
  });

  res.send({
    message: "Product updated successfully",
  });
});

server.get("/products", async (req, res) => {
  const products = await productCollection.find({});
  res.send(products);
});

server.get("/product/:id", async (req, res) => {
  const product = await productCollection.findById(req.params.id);

  res.send(product);
});

server.delete("/product/:id", async (req, res) => {
  await productCollection.findByIdAndDelete(req.params.id);

  res.send({
    message: "Deleted successfully",
  });
});

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userCollection = mongoose.model("users", userSchema);

server.post("/new-user", async (req, res) => {
  const userDetails = req.body;

  const hashedPassword = bcrypt.hashSync(userDetails.password, 10);

  await userCollection.create({
    fullName: userDetails.fullName,
    email: userDetails.email,
    password: hashedPassword,
  });

  res.send({
    message: "User created successfully",
  });
});

server.listen(3000, function () {
  console.log("Server is up");
});
*/

/*
// CLASS 5
// Spliting codes in different folders
const express = require("express");
const logger = require("morgan");
const uid = require("uuid");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(logger("dev"));

const connection = mongoose.connect("mongodb://localhost:27017/kodecamp4");
connection
  .then(() => {
    console.log("Connected successfully to mongodb");
  })
  .catch((error) => {
    console.log("An error occurred while trying to connect. Error: ", error);
  });

server.use("/products", productRoutes);
server.use("/user", userRoutes);

server.listen(3000, function () {
  console.log("Server is up");
});
*/

// CLASS 6
// Installing dotenv
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRouter = require("./routesAndControllers/authenticationRoutes");
// const bcrypt = require("bcrypt");
// const userRoutes = require("./routes/userRoutes");
// const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// server.use(logger("dev"));

const connection = mongoose.connect(process.env.MONGODB_URL);
connection
  .then(() => {
    console.log("Connected successfully to mongodb");
  })
  .catch((error) => {
    console.log("An error occurred while trying to connect. Error: ", error);
  });

// server.use("/products", productRoutes);
// server.use("/user", userRoutes);

app.use("/auth", authRouter);

app.listen(process.env.PORT, function () {
  console.log("Server is up");
});
