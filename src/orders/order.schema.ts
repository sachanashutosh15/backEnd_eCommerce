// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Product } from "src/inventory/product.interface";
import * as mongoose from "mongoose";
// import { User } from "src/user/user.interface";

// export type OrderDocument = Order & Document;

// @Schema()
// export class Order {
//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
//   userId: User

//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
//   productId: Product 

//   @Prop()
//   quantity: number

//   @Prop()
//   status: string
// }

export const OrderSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  quantity: Number,
  status: String
});