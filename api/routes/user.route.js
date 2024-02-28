const express = require("express");
const {
  test,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifiedUser");

const userRoutes = express.Router();

userRoutes.get("/test", test);
userRoutes.put("/update/:userId", verifyToken, updateUser);
userRoutes.delete("/delete/:userId", verifyToken, deleteUser);

module.exports = { userRoutes };
