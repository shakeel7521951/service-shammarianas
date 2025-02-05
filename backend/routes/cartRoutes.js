import express from "express";
import {
  addToCart,
  getCartItems,
  removeFromCart,
} from "../controllers/cartController.js";
import authenticate from "../middlewares/authenticate.js";
import { stripeCheckout } from "../controllers/stripe.js";
const cartRouter = express.Router();

cartRouter.route("/add/:id").post(authenticate, addToCart);
cartRouter.route("/remove/:id").post(authenticate, removeFromCart);
cartRouter.route("/all/get").get(authenticate, getCartItems);

cartRouter.route('/create-payment').post(authenticate,stripeCheckout);

export default cartRouter;
