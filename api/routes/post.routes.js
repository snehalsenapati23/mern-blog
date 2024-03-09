const express = require("express");
const { verifyToken } = require("../utils/verifiedUser");
const { create, getPosts, deletePost } = require("../controllers/post.controller");

const postRoutes = express.Router();

postRoutes.post("/create", verifyToken, create);

postRoutes.get("/getposts", getPosts);
postRoutes.delete("/deleteposts/:postId/:userId", verifyToken, deletePost);

module.exports = { postRoutes };
