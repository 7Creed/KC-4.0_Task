const { productCollection } = require("../models/product");

const createProduct = async (req, res) => {
  const productDetails = req.body;
  await productCollection.create({
    productName: productDetails.productName,
    productPrice: productDetails.productPrice,
  });

  res.send({
    message: "Product created successfully",
  });
};

const updateProduct = async (req, res) => {
  const productDetails = req.body;
  await productCollection.findByIdAndUpdate(req.params.id, {
    productName: productDetails.productName,
    productPrice: productDetails.productPrice,
  });

  res.send({
    message: "Product updated successfully",
  });
};

const getAllProduct = async (req, res) => {
  const products = await productCollection.find({});
  res.send(products);
};

const getAProduct = async (req, res) => {
  const product = await productCollection.findById(req.params.id);

  res.send(product);
};

const deleteAProduct = async (req, res) => {
  await productCollection.findByIdAndDelete(req.params.id);

  res.send({
    message: "Deleted successfully",
  });
};

module.exports = {
  createProduct,
  updateProduct,
  getAllProduct,
  getAProduct,
  deleteAProduct,
};
