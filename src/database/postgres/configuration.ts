import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const postgresTypeOrmModuleAsyncOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'postgres',
    host: config.get<string>('postgresMain.host'),
    port: config.get<number>('postgresMain.port'),
    username: config.get<string>('postgresMain.username'),
    password: config.get<string>('postgresMain.password'),
    database: config.get<string>('postgresMain.database'),
    synchronize: config.get<boolean>('postgresMain.synchronize'),
    logging: config.get<boolean>('postgresMain.logging'),
    entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
    // autoLoadEntities: true,
  }),
};
