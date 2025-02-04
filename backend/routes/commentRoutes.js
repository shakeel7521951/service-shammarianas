import express from "express";
import authenticate from "../middlewares/authenticate.js";
import {
  addComment,
  deleteComment,
  getComment,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.get("/get/:id", authenticate, getComment);

commentRouter.post("/add/:id", authenticate, addComment);

commentRouter.delete("/delete/:id", authenticate, deleteComment);

export default commentRouter;
