const { userCollection } = require("../models/user");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const userDetails = req.body;

  const hashedPassword = bcrypt.hashSync(userDetails.password, 10);

  await userCollection.create({
    fullName: userDetails.fullName,
    email: userDetails.email,
    password: hashedPassword,
  });

  res.status(201).send({
    message: "User created successfully",
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userCollection.findOne({ email });

  if (!user) {
    res.status(404).send({
      message: "User does not exist",
    });
    return;
  }

  const doPasswordsMatch = bcrypt.compareSync(password, user.password);

  if (!doPasswordsMatch) {
    res.status(400).send({
      message: "Passwords do not match",
    });
    return;
  }

  res.send({
    message: "Login successfully",
  });
};

module.exports = {
  registerUser,
  loginUser,
};
