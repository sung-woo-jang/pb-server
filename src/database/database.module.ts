import { Module } from '@nestjs/common';
import { PostgresConfigModule } from './postgres/postgres.module';

@Module({
  imports: [PostgresConfigModule],
})
export class DatabaseModule {}
