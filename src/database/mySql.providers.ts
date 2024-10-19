import { DataSource } from "typeorm";

export const mySqlProvider = [
  {
    provide: 'MYSQL_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        url: process.env.MYSQL_CONNECTION_STRING,
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false
      })
      return dataSource.initialize();
    }
  }
]