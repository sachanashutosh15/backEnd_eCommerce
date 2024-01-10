import { Module } from "@nestjs/common";
import { mySqlProvider } from "./mySql.providers";
import { mongoDbProviders } from "./mongoDb.providers";

@Module({
  providers: [
    ...mySqlProvider,
    ...mongoDbProviders
  ],
  exports: [
    ...mySqlProvider,
    ...mongoDbProviders
  ]
})

export class DataBaseModule {}