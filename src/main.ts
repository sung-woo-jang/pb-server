import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setNestApp } from './setNestApp';
import { setSwagger } from './setSwagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setNestApp(app);
  setSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');

  await app.listen(port);
}
bootstrap();
