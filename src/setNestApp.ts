import { INestApplication, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as path from 'path';
import { sessionConfig } from './database/postgres/session';
import { LoggingInterceptor } from '@common/interceptors/logger.interceptor';

export const setNestApp = (app: INestApplication) => {
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

  // class-validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: false,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // HttpException Filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Response Interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  app.use(sessionConfig);
};
