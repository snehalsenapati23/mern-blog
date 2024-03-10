const express = require("express");
const { createComment } = require("../controllers/comment.controller");
const { verifyToken } = require("../utils/verifiedUser");

const commentRoutes = express.Router();

commentRoutes.post("/create", verifyToken, createComment);

module.exports = { commentRoutes };
