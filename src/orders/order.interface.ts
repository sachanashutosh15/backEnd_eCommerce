import { Document } from "mongoose";

export interface Order extends Document {
  readonly userId: string,
  readonly productId: string,
  readonly quantity: number,
  readonly status: string
}