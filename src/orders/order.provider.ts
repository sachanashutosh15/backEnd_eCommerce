import { DataSource } from "typeorm";
import { SqlOrder } from "./order.entity";

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(SqlOrder),
    inject: ['DATA_SOURCE']
  }
];