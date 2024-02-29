const express = require("express");
const { verifyToken } = require("../utils/verifiedUser");
const { create } = require("../controllers/post.controller");

const postRoutes = express.Router();

postRoutes.post("/create", verifyToken, create);

module.exports = { postRoutes };
