import Purchase from "../models/purchasedModel.js";

export const getPurchases = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const purchases = await Purchase.find({ purchaseBy: userId })
      .populate("purchaseBy")
      .populate("purchasedItem")
      .sort({ createdAt: -1 });

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    res.status(500).json({ error: error.message });
  }
};
