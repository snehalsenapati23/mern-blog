const { Post } = require("../models/Post.model");
const { errorHandlers } = require("../utils/error");

const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandlers(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandlers(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "-");
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

module.exports = { create };
