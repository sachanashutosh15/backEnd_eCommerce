import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.schema";
import { databaseProviders } from "./mysqlProvider";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema}])
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})

export class DataBaseModule {}