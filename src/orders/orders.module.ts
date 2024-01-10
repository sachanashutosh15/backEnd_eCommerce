import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { InventoryService } from 'src/inventory/inventory.service';
import { orderProviders } from './order.provider';
import { productProviders } from 'src/inventory/products.providers';
import { mongoDbProviders } from 'src/database/mongoDb.providers';
import { UserService } from 'src/user/user.service';
import { usersProviders } from 'src/user/users.provider';
import { mySqlProvider } from 'src/database/mySql.providers';

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    InventoryService,
    UserService,
    ...usersProviders,
    ...orderProviders,
    ...productProviders,
    ...mongoDbProviders,
    ...mySqlProvider
  ]
})
export class OrdersModule {}
