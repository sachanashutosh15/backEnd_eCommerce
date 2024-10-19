import { Connection } from "mongoose";
import { OrderSchema } from "./order.schema";
import { DataSource } from "typeorm";
import { SqlOrder } from "./order.entity";

export const orderProviders = [
  {
    provide: 'ORDER_MODEL',
    useFactory: (connection: Connection) => connection.model('Order', OrderSchema),
    inject: ['MONGODB_CONNECTION']
  },
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: ( dataSource: DataSource ) => dataSource.getRepository(SqlOrder),
    inject: [ 'MYSQL_CONNECTION' ]
  }
];