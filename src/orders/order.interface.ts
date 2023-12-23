import * as mongoose from 'mongoose';

export interface Order extends mongoose.Document {
  readonly userId: mongoose.Schema.Types.ObjectId,
  readonly productId: mongoose.Schema.Types.ObjectId,
  readonly quantity: number,
  readonly status: string
}

export interface OrderDetails_int {
  userId: mongoose.Schema.Types.ObjectId,
  productId: mongoose.Schema.Types.ObjectId,
  quantity: number,
  status: string
}