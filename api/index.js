const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { userRoutes } = require("./routes/User.route");
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

app.get("/api/user", userRoutes);
