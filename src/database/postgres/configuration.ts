import { ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const postgresTypeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    port: 5432,
    host: process.env.HOST,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    logging: process.env.MODE !== 'production',
    entities: [__dirname + '/../../**/*.entity.{js,ts}'],
    synchronize: true, //process.env.MODE === 'dev', //! set 'false' in production
    // autoLoadEntities: true,
    
  }),
};
