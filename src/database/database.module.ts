import { Module } from "@nestjs/common";
import { mySqlProviders } from "./mySql.providers";
import { mongoDbProviders } from "./mongoDb.providers";

@Module({
  providers: [
    ...mySqlProviders,
    ...mongoDbProviders
  ],
  exports: [
    ...mySqlProviders,
    ...mongoDbProviders
  ]
})

export class DataBaseModule {}