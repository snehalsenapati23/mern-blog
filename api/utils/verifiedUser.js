const  jwt  = require("jsonwebtoken");
const { errorHandlers } = require("./error.js");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandlers(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return next(errorHandlers(401, "Unauthorized"));
    }
    console.log(user);
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
