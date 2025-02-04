import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controllers/cartController.js";
import authenticate from "../middlewares/authenticate.js";
const cartRouter = express.Router();

cartRouter.route("/add/:id").post(authenticate, addToCart);
cartRouter.route("/remove/:id").post(authenticate, removeFromCart);
cartRouter.route("/all/get").get(authenticate, getCartItems);

export default cartRouter;
