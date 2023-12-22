import { Document } from "mongoose";

export interface userInterface extends Document {
  readonly name: string,
  readonly email: string,
  readonly password: string,
  readonly address: string
}