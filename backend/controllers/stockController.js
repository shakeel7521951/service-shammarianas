import Stock from "../models/stockModel.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import Cart from "../models/cartModel.js";
import path from "path";

export const addStock = async (req, res) => {
  const userId = req.id;
  const file = req.file;
  const { title, stockDescription, category } = req.body;
  let { price } = req.body;
  try {
    const allowedCategories = [
      "Electronics",
      "Fashion",
      "Home & Kitchen",
      "Sports",
      "Books",
      "Health & Beauty",
      "Other",
    ];

    if (!allowedCategories.includes(category)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid category." });
    }

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "Stock image or video is required." });
    }

    const fileExt = path.extname(file.originalname).toLowerCase();
    const isVideo = [".mp4", ".mov", ".avi", ".mkv"].includes(fileExt);
    const isImage = [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(
      fileExt
    );

    if (!isVideo && !isImage) {
      return res.status(400).json({
        success: false,
        message: "Unsupported file type. Upload images or videos only.",
      });
    }

    const dataUri = getDataUri(file);

    let cloudRes = await cloudinary.uploader.upload(dataUri, {
      folder: "shamarian_stocks",
      resource_type: isVideo ? "video" : "image",
    });

    if (price !== undefined && price !== null && price !== "") {
      price = Number(price);
    } else {
      price = 0;
    }
    const newStock = await Stock.create({
      title,
      stockImageUrl: cloudRes.secure_url,
      publicId: cloudRes.public_id,
      stockDescription,
      price,
      category,
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
  const { title, stockDescription, category } = req.body;
  let file = req.file;
  let { price } = req.body;

  try {
    const stock = await Stock.findById(id);

    if (!stock) {
      return res
        .status(404)
        .json({ success: false, message: "Stock not found." });
    }

    if (category) {
      const allowedCategories = [
        "Electronics",
        "Fashion",
        "Home & Kitchen",
        "Sports",
        "Books",
        "Health & Beauty",
        "Other",
      ];
      if (!allowedCategories.includes(category)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid category." });
      }
      stock.category = category;
    }

    if (title) stock.title = title;
    if (stockDescription) stock.stockDescription = stockDescription;
    if (price) {
      price = Number(price);
      stock.price = price;
    } else {
      stock.price = 0;
    }
    if (file) {
      const fileExt = path.extname(file.originalname).toLowerCase();
      const isVideo = [".mp4", ".mov", ".avi", ".mkv"].includes(fileExt);
      const isImage = [".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(
        fileExt
      );

      if (!isVideo && !isImage) {
        return res.status(400).json({
          success: false,
          message: "Unsupported file type. Upload images or videos only.",
        });
      }

      const dataUri = getDataUri(file);

      let cloudRes = await cloudinary.uploader.upload(dataUri, {
        folder: "shamarian_stocks",
        resource_type: isVideo ? "video" : "image",
      });

      stock.stockImageUrl = cloudRes.secure_url;
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

    await Stock.findByIdAndDelete(id);

    await Cart.deleteMany({ stockId: id });

    return res.status(200).json({
      success: true,
      message: "Stock deleted successfully and removed from carts.",
    });
  } catch (error) {
    console.error(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete stock." });
  }
};
