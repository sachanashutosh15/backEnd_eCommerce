import { DataSource } from "typeorm";

export const mySqlProvider = [
  {
    provide: 'MYSQL_CONNECTION',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        url: "mysql://root:cUWSHMLDOoWkYNoXBVtcTvnXyBtjPAKJ@autorack.proxy.rlwy.net:51097/railway",
        entities: [
          __dirname + '/../**/*.entity{.ts,.js}',
        ],
        synchronize: false
      })
      return dataSource.initialize();
    }
  }
]