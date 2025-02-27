import { entities } from 'src/entity';
import { DataSource } from 'typeorm';

export const databaseConfig = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'reservacion2_db',
        entities: entities,
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];