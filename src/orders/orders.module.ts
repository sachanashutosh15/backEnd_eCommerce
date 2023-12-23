import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/database/order.schema';
import { Product, ProductSchema } from 'src/database/product.schema';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User, UserSchema } from 'src/database/user.schema';
import { orderProviders } from './order.provider';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema
      },
      {
        name: Product.name,
        schema: ProductSchema
      },
      {
        name: User.name,
        schema: UserSchema
      }
    ]),
    JwtModule,
    UserModule
  ],
  controllers: [OrdersController],
  providers: [...orderProviders, OrdersService, UserService]
})
export class OrdersModule {}
