import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  addComment,
  deleteComment,
  getAllComments,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.route("/all/get").get(authenticate, getAllComments);

commentRouter.route("/add/:id").post(authenticate, addComment);

commentRouter.route("/delete/:id").delete(authenticate, deleteComment);

export default commentRouter;
