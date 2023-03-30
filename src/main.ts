import { FastifyRequest } from 'fastify';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { VERSION_METADATA } from '@nestjs/common/constants';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(3000, () => console.log('Server on port 3000'));
}
bootstrap();
