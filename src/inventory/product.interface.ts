import { Document } from "mongoose";

export interface Product extends Document {
  readonly name: String,
  readonly image: String,
  readonly description: String,
  readonly weight: Number,
  readonly quantity: Number,
  readonly price: Number
}