import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './appConfiguration';

@Module({
  imports: [ConfigModule.forRoot(appConfig)],
  exports: [ConfigModule],
})
export class AppConfigModule {}
