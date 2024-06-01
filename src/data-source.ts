import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  port: 5432,
  host: process.env.HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: true,
  entities: ['src/**/*.entity.ts'],
  synchronize: true, //process.env.MODE === 'dev', //! set 'false' in production
  // autoLoadEntities: true,
  // logging: process.env.MODE == 'dev',
});
