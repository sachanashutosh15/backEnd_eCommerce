// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import { Document } from "mongoose";

// export type ProductDocument = Product & Document;

// @Schema()
// export class Product {
//   @Prop()
//   name: string

//   @Prop()
//   image: string

//   @Prop()
//   description: string

//   @Prop()
//   weight: number

//   @Prop()
//   quantity: number

//   @Prop()
//   price: number
// }
import * as mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  weight: Number,
  quantity: Number,
  price: Number
});