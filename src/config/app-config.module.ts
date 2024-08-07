import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { default as defaultConfig } from './default';
import { postgresConfig } from './database';
import { naverConfig } from './naver';
import { validationSchema } from './validation.schema';
import { openAIConfig } from './openai';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: [`.env.${process.env.MODE}`],
      load: [defaultConfig, postgresConfig, naverConfig, openAIConfig],
      validationSchema,
    }),
  ],
})
export class AppConfigModule {}
