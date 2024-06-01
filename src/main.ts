import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setNestApp } from './setNestApp';
import { setSwagger } from './setSwagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setNestApp(app);
  setSwagger(app);
  await app.listen(+process.env.PORT);
}
bootstrap();
