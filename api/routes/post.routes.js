const express = require("express");
const { verifyToken } = require("../utils/verifiedUser");
const { create, getPosts } = require("../controllers/post.controller");

const postRoutes = express.Router();

postRoutes.post("/create", verifyToken, create);

postRoutes.get("/getposts", getPosts);

module.exports = { postRoutes };
