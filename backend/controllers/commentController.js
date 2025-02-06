import Comment from "../models/commentsModel.js";
import User from "../models/userModel.js";
import Blog from "../models/blogModel.js";

export const addComment = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found.",
      });
    }

    const newComment = await Comment.create({
      content: req.body.content,
      name: req.body.name,
      blogId,
      author: req.id,
    });

    blog.comments.push(newComment._id);
    await blog.save();

    return res.status(201).json({
      success: true,
      message: "Comment added successfully.",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error in adding comment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add comment.",
    });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. User not found.",
      });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found.",
      });
    }

    if (user.role !== "admin" && comment.author.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only delete your own comment.",
      });
    }

    await Blog.findByIdAndUpdate(comment.blogId, {
      $pull: { comments: commentId },
    });

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully.",
    });
  } catch (error) {
    console.error("Error in deleting comment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to delete comment.",
    });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All comments fetched successfully.",
      comments,
    });
  } catch (error) {
    console.error("Error fetching all comments:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all comments.",
    });
  }
};
