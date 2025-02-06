import mongoose from "mongoose";

const { Schema } = mongoose;

const purchaseSchema = new Schema(
  {
    purchaseBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    purchasedItem: [
      {
        type: Schema.Types.ObjectId,
        ref: "Stock",
        required: true,
      },
    ],
    totalAmount: {
      type: Number,
    },
    paymentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
