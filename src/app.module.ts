import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { DataBaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './database/user.schema';
import { UserController } from './user/user.controller';
import { InventoryModule } from './inventory/inventory.module';
import { OrdersModule } from './orders/orders.module';
import { APP_GUARD } from "@nestjs/core";
import { MyAuthGuard } from './auth/auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://sachanashutosh15:Ashutosh_99@cluster0.agcck.mongodb.net/?retryWrites=true&w=majority', {
      dbName: "e-comm"
    }),
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
    AuthModule,
    JwtModule,
    UserModule,
    DataBaseModule,
    InventoryModule,
    OrdersModule
  ],
  controllers: [AppController, AuthController, UserController],
  providers: [
    AppService,
    AuthService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: MyAuthGuard
    }
  ],
})
export class AppModule {}
