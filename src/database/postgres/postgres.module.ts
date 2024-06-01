import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { postgresTypeOrmModuleAsyncOptions } from './configuration';

@Module({
  imports: [TypeOrmModule.forRootAsync(postgresTypeOrmModuleAsyncOptions)],
})
export class PostgresConfigModule {}
