import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SseModule } from './sse/sse.module';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/appConfig.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    SseModule,
  ],
  providers:[{
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor,
  },]
})
export class AppModule {}
