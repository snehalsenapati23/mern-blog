const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { userRoutes } = require("./routes/user.route");
const { authRoutes } = require("./routes/auth.routes");
const cookieParser = require("cookie-parser");
const { postRoutes } = require("./routes/post.routes");

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
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Servererror ";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
