const express = require("express");
const {
  test,
  updateUser,
  deleteUser,
  signOut,
} = require("../controllers/user.controller");
const { verifyToken } = require("../utils/verifiedUser");

const userRoutes = express.Router();

userRoutes.get("/test", test);
userRoutes.put("/update/:userId", verifyToken, updateUser);
userRoutes.delete("/delete/:userId", verifyToken, deleteUser);
userRoutes.post("/signout", signOut);
module.exports = { userRoutes };
