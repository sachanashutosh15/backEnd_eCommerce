import { DataSource } from "typeorm";

export const mySqlProvider = [
  {
    provide: 'MYSQL_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'sql12.freemysqlhosting.net',
        port: 3306,
        username: 'sql12672354',
        database: 'sql12672354',
        password: 'VWHKPtVE4D',
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: true
      })
      return dataSource.initialize();
    }
  }
]