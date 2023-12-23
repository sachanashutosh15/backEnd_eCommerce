import * as mongoose from "mongoose";

export const OrderSchema = new mongoose.Schema({
  userId: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId
  },
  productId: {
    ref: "products",
    type: mongoose.Schema.Types.ObjectId
  },
  quantity: Number,
  status: String
});