import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();
const stripeInstance = new Stripe(process.env.STRIPE_SECRET);

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
      success_url: "http://localhost:3000",
      cancel_url: "http://localhost:3000/cart-data",
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: error.message });
  }
};
