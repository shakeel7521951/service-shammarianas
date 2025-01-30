import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import singleUpload from "../middlewares/upload.js";
import {
  addBlog,
  getBlog,
  delBlog,
  updateBlog,
  getAllBlogs,
} from "../controllers/blogController.js";

const blogRouter = Router();

blogRouter.route("/get/:id").get(authenticate, getBlog);
blogRouter.route("/all/get").get(getAllBlogs);

blogRouter.route("/add").post(authenticate, singleUpload, addBlog);

blogRouter.route("/update/:id").put(authenticate, singleUpload, updateBlog);
blogRouter.route("/delete/:id").delete(authenticate, delBlog);

export default blogRouter;
