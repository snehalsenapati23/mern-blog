const express = require("express");
const { verifyToken } = require("../utils/verifiedUser");
const {
  create,
  getPosts,
  deletePost,
  updatePost,
  getUsers,
} = require("../controllers/post.controller");

const postRoutes = express.Router();

postRoutes.post("/create", verifyToken, create);

postRoutes.get("/getposts", getPosts);
postRoutes.delete("/deleteposts/:postId/:userId", verifyToken, deletePost);
postRoutes.put("/updateposts/:postId/:userId", verifyToken, updatePost);

module.exports = { postRoutes };
