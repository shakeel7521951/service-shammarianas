import express from "express";
import {
  signup,
  signin,
  signout,
  getUser,
} from "../controllers/userController.js";
import redirectIfAuthenticated from "../middlewares/redirectIfAuthenticated.js";
import authenticate from "../middlewares/authenticate.js";

const userRouter = express.Router();

userRouter.route("/sign-up").post(signup);
userRouter.route("/sign-in").post(signin);
userRouter.route("/get").get(authenticate, getUser);
userRouter.route("/sign-out").post(authenticate, signout);

export default userRouter;
