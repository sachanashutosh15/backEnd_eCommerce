import { Connection } from "mongoose";
import { OrderSchema } from "./order.schema";
import { DataSource } from "typeorm";
import { Order } from "./order.entity";

export const orderProviders = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (connection: Connection) => connection.model('Order', OrderSchema),
    inject: ['MONGODB_CONNECTION']
  },
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: ( dataSource: DataSource ) => dataSource.getRepository(Order),
    inject: [ 'MYSQL_CONNECTION' ]
  }
];