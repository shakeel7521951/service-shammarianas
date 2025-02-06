import express from "express";
const purchasesRouter = express.Router();

import { getPurchases } from "../controllers/purchasesController.js";
import authenticate from "../middlewares/authenticate.js";

purchasesRouter.route("/get").get(authenticate, getPurchases);

export default purchasesRouter;
