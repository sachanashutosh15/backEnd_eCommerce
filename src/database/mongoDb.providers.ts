import * as mongoose from "mongoose";

export type ObjectId = mongoose.Schema.Types.ObjectId;

export const mongoDbProviders = [
  {
    provide: "MONGODB_CONNECTION",
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGODB_CONNECTION_STRING,
        {
          dbName: "e-comm"
        }
      )
  }
]