import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm/data-source';
import { SeederOptions } from 'typeorm-extension';
import InitSeeder from '../init.seeder';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: '.env.local',
});
const options: DataSourceOptions & SeederOptions = {
  namingStrategy: new SnakeNamingStrategy(),
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(String(process.env.POSTGRES_DB_PORT), 10) || 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../../modules/**/*.entity.{js,ts}'],
  seeds: [InitSeeder],
};

export const source = new DataSource(options);
