import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Product } from "./product.schema";
import { User } from "./user.schema";
import * as mongoose from "mongoose";

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: User

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
  productId: Product 

  @Prop()
  quantity: number

  @Prop()
  status: string
}

export const OrderSchema = SchemaFactory.createForClass(Order);