import mongoose from "mongoose";

const { Schema } = mongoose;

const stockSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    stockImageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },
    stockDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: null,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
