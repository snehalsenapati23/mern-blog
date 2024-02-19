const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");

const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/signin", signin);
module.exports = { authRoutes };
