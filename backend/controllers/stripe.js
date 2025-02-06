import Stripe from "stripe";
import dotenv from "dotenv";
import Cart from "../models/cartModel.js";
import Purchase from "../models/purchasedModel.js";

dotenv.config();
const stripeInstance = new Stripe(
  "sk_test_51Qp3MIC1NDqhDk4uOhAnRfBeVinUjwzrQC8vPdlL0zeaxKxbX7dEMwCpEi3f2JcxT0rccnGyy5SET0NCgn8lL3SJ008ho3ALqF"
);

export const stripeCheckout = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ error: "Cart is empty!" });
    }

    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title,
          images: [product.image],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: 1,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      metadata: { userId: req.id },
      success_url: `http://localhost:3000/purchased-items?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cart-data",
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const checkPayment = async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    const session = await stripeInstance.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const userId = session.metadata.userId;

      if (!userId) {
        return res
          .status(400)
          .json({ error: "User ID missing from session metadata" });
      }

      const cartItems = await Cart.find({ cartUser: userId });
      const purchasedStockIds = cartItems.map((product) => product.stockId._id);

      if (purchasedStockIds.length > 0) {
        await Purchase.create({
          purchaseBy: userId,
          purchasedItem: purchasedStockIds,
          totalAmount: session.amount_total / 100,
          paymentId: session.id,
        });
      }

      await Cart.deleteMany({ cartUser: userId });

      return res
        .status(200)
        .json({ status: "Payment Successful, Cart Cleared" });
    } else {
      return res.status(200).json({ status: "Payment Pending or Failed" });
    }
  } catch (error) {
    console.error("Error retrieving payment:", error);
    res.status(500).json({ error: error.message });
  }
};
