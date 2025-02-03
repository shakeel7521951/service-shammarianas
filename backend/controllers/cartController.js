import Cart from "../models/cartModel.js";

export const addToCart = async (req, res) => {
  try {
    const userId = req.id;
    const stockId = req.params.id;

    const existingItem = await Cart.findOne({ cartUser: userId, stockId });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();
      return res.status(200).json({
        success: true,
        message: "Stock quantity increased in the cart",
        cart: existingItem,
      });
    }

    const stock = await Cart.create({
      cartUser: userId,
      stockId,
      quantity: 1,
    });

    return res.status(201).json({
      success: true,
      message: "Stock added to the cart successfully",
      cart: stock,
    });
  } catch (error) {
    console.error("Error in adding to cart:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to add the stock",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const stockId = req.params.id;

    const existingItem = await Cart.findOne({ cartUser: userId, stockId });

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Stock not found in the cart",
      });
    }

    if (existingItem.quantity > 1) {
      existingItem.quantity -= 1;
      await existingItem.save();
      return res.status(200).json({
        success: true,
        message: "Stock quantity decreased in the cart",
        cart: existingItem,
      });
    }

    await Cart.deleteOne({ _id: existingItem._id });

    return res.status(200).json({
      success: true,
      message: "Stock removed from the cart",
    });
  } catch (error) {
    console.error("Error in removing from cart:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to remove the stock",
    });
  }
};

export const getCartItems = async (req, res) => {
  try {
    const userId = req.id;

    const cartItems = await Cart.find({ cartUser: userId }).populate("stockId");
    if (!cartItems || cartItems.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No items found in the cart",
      });
    }

    return res.status(200).json({
      success: true,
      cart: cartItems,
    });
  } catch (error) {
    console.error("Error in fetching cart items:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart items",
    });
  }
};
