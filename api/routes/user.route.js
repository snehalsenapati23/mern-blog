const express = require("express");
const { test } = require("../controllers/user.controller");

const userRoutes = express.Router();

userRoutes.get("/api/user", test);

module.exports = { userRoutes };
