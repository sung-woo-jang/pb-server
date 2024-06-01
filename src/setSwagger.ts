import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setSwagger = (app: INestApplication) => {
  // Swagger
  SwaggerModule.setup(
    '/docs',
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('Swagger Common API')
        .setDescription('Writed by ㅇㅇ')
        .setVersion('1.0')
        .build(),
    ),
  );
};
