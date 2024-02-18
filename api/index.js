const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { userRoutes } = require("./routes/User.route");
const { authRoutes } = require("./routes/auth.routes");
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
app.use(express.json());
app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
