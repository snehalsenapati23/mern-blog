const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { errorHandlers } = require("../utils/error");

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandlers(400, "All fields are required"));
  }
  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("signup successful");
  } catch (error) {
    next(error);
  }
};

module.exports = { signup };
