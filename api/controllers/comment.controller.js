const { Comment } = require("../models/comment.model");
const { errorHandlers } = require("../utils/error");

const createComment = async (req, res, nexr) => {
  try {
    const { postId, userId, content } = req.body;

    if (userId !== req.user.id) {
      return next(
        errorHandlers(401, "You are not allowed to create this comment")
      );
    }
    const newComment = new Comment({ content, postId, userId });
    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {}
};

module.exports = { createComment };
