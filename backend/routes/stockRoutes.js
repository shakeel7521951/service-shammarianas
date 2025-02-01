import express from "express";
import {
  addStock,
  deleteStock,
  getAllStocks,
  getStockById,
  updateStock,
} from "../controllers/stockController.js";
import singleUpload from "../middlewares/upload.js";
import authenticate from "../middlewares/authenticate.js";

const stockRouter = express.Router();

stockRouter.route("/add").post(singleUpload, addStock);
stockRouter.route("/all/get").get(getAllStocks);
stockRouter.route("/get/:id").get(getStockById);
stockRouter.route("/update/:id").put(singleUpload, updateStock);
stockRouter.route("/delete/:id").delete(deleteStock);

export default stockRouter;
