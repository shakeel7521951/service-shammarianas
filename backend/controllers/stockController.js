import Stock from "../models/stockModel.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const addStock = async (req, res) => {
  const userId = req.id;
  let file = req.file;
  const { title, stockDescription, price } = req.body;

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Stock image is required." });
    }

    const dataUri = getDataUri(file);
    let cloudRes = await cloudinary.uploader.upload(dataUri, {
      folder: "shamarian_stocks",
    });
    const newStock = await Stock.create({
      title,
      stockImageUrl: cloudRes.secure_url,
      stockDescription,
      price,
      // author: "admin",
    });

    return res.status(201).json({ success: true, stock: newStock });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to add stock." });
  }
};

export const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });

    return res.status(200).json({ success: true, stocks });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch stocks." });
  }
};

export const getStockById = async (req, res) => {
  const { id } = req.params;

  try {
    const stock = await Stock.findById(id).populate("author", "fullName email");

    if (!stock) {
      return res
        .status(404)
        .json({ success: false, message: "Stock not found." });
    }

    return res.status(200).json({ success: true, stock });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch stock details." });
  }
};

export const updateStock = async (req, res) => {
  const userId = req.id;
  const { id } = req.params;
  const { title, stockDescription, price } = req.body;
  let file = req.file;
  let cloudRes;

  try {
    const stock = await Stock.findById(id);

    if (!stock) {
      return res
        .status(404)
        .json({ success: false, message: "Stock not found." });
    }

    // if (stock.author == userId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Unauthorized to update this stock.",
    //   });
    // }

    if (title) stock.title = title;
    if (stockDescription) stock.stockDescription = stockDescription;
    if (file) {
      const dataUri = getDataUri(file);
      cloudRes = await cloudinary.uploader.upload(dataUri, {
        folder: "shamarian_stocks",
      });
      stock.stockImageUrl = cloudRes.secure_url;
    }
    if (price) {
      stock.price = price;
    }
    await stock.save();

    return res
      .status(200)
      .json({ success: true, message: "Stock updated successfully.", stock });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update stock." });
  }
};

export const deleteStock = async (req, res) => {
  const userId = req.id;
  const { id } = req.params;

  try {
    const stock = await Stock.findById(id);

    if (!stock) {
      return res
        .status(404)
        .json({ success: false, message: "Stock not found." });
    }

    // if (stock.author !== userId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Unauthorized to delete this stock.",
    //   });
    // }

    await Stock.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "Stock deleted successfully." });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete stock." });
  }
};
