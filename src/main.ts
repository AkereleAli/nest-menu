import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted:true}));
  app.enableCors()
  app.setGlobalPrefix('api/v1')
  await app.listen(3123);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
