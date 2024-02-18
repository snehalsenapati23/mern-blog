const express = require("express");
const { signup } = require("../controllers/auth.controller");

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
module.exports = { authRoutes };
