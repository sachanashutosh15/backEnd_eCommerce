import * as mongoose from "mongoose";

export type ObjectId = mongoose.Schema.Types.ObjectId;

export const mongoDbProviders = [
  {
    provide: "MONGODB_CONNECTION",
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(
        "mongodb+srv://sachanashutosh15:Ashutosh_99@cluster0.agcck.mongodb.net/?retryWrites=true&w=majority",
        {
          dbName: "e-comm"
        }
      )
  }
]