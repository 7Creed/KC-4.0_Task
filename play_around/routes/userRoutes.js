const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");

const userRoutes = express.Router();

userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

module.exports = userRoutes;
