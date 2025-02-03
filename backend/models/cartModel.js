import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    cartUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stockId: {
      type: Schema.Types.ObjectId,
      ref: "Stock",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
