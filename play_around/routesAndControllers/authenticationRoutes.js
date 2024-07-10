const express = require("express");
const { userModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");
const { sendEmail } = require("../utils/emailUtils");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// Define your payload and secret key
// const payload = { username: "exampleUser" };
// const secretKey = "yourSecretKey";

// Create a token
// const token = jwt.sign(payload, secretKey, { expiresIn: "1h" }); // Token expires in 1 hour

// console.log("Generated Token:", token);

// From here
// authRouter.post("/register", async (req, res) => {
//   const { fullName, email, password } = req.body;

//   const hashedPassword = bcrypt.hashSync(password, 10);

//   const token = v4();

//   try {
//     console.log("this one");
//     await userModel.create({
//       fullName,
//       email,
//       password: hashedPassword,
//       authToken: token,
//       authPurpose: "verify-email",
//     });

//     // "chideraamazingkids@gmail.com",
//     await sendEmail(
//       email,
//       "verify email",
//       `Hello ${fullName}, the link to verify your email is http://localhost:3000/auth/verify-email/${token}`
//     );

//     res.status(201).send({
//       isSuccessful: true,
//       message: "Kindly check your email to verify it.",
//     });
//   } catch (error) {
//     console.log("our error:", error);
//   }
// });

// New
// const express = require("express");
// const { userModel } = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const { v4 } = require("uuid");
// const { sendEmail } = require("../utils/emailUtil");
// const authRouter = express.Router();
// const jwt = require("jsonwebtoken");

authRouter.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  const token = v4();

  await userModel.create({
    fullName,
    email,
    password: hashedPassword,
    authToken: token,
    authPurpose: "verify-email",
  });

  console.log(process.env.EMAIL_USERNAME);
  console.log(process.env.EMAIL_PASSWORD);
  await sendEmail(
    email,
    "Verify Email",
    "Hello" +
      " " +
      fullName +
      " " +
      "link to verify email is http://localhost:3000/verify-email/" +
      " " +
      token
  );

  res.status(201).send({
    isSuccessful: true,
    message: "Kindly check your email to verify it",
  });
});

authRouter.get("/verify-email/:token", async (req, res) => {
  const { token } = req.params;

  const doesUserExist = await userModel.exists({
    authToken: token,
    authPurpose: "verify-email",
  });

  if (!doesUserExist) {
    res.status(404).send({
      isSuccessful: false,
      message: "The user does not exist",
    });
    return;
  }

  await userModel.findOneAndUpdate(
    {
      authToken: token,
      authPurpose: "verify-email",
    },
    {
      isEmailVerified: true,
    }
  );

  res.send({
    isSuccessful: true,
    message: "Email verified successfully",
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    res.status(404).send({
      isSuccessful: false,
      message: "User does not exist",
    });
    return;
  }

  const doPasswordsMatch = bcrypt.compareSync(password, user.password);

  if (!doPasswordsMatch) {
    res.status(401).send({
      isSuccessful: false,
      message: "Password not correct",
    });
    return;
  }

  const userToken = jwt.sign({
    userId: user._id,
    email: user.email,
  });

  res.send({
    isSuccessful: true,
    userDetails: {
      fullName: user.fullName,
      email: user.email,
    },
    userToken,
    message: "Logged in successfully",
  });
});

// authRouter.post("/register", (req, res) => {});
// authRouter.post("/register", (req, res) => {});

module.exports = authRouter;
