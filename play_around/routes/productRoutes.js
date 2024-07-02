const express = require("express");
const {
  createProduct,
  deleteAProduct,
  getAProduct,
  getAllProduct,
  updateProduct,
} = require("../controller/productController");
// const { productCollection } = require("../models/product");

const productRoutes = express.Router();

productRoutes.post("/", createProduct); // /products/product

productRoutes.put("/:id", updateProduct); // /products/product/:id

productRoutes.get("/", getAllProduct); // /products/products

productRoutes.get("/:id", getAProduct); // /products/:id

productRoutes.delete("/:id", deleteAProduct); // /products/:id

module.exports = productRoutes;
