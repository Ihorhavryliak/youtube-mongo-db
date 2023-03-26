import { FastifyRequest } from 'fastify';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { VERSION_METADATA } from '@nestjs/common/constants';




async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '2',
  });
  

  app.useGlobalPipes(
    new ValidationPipe({ disableErrorMessages: true, whitelist: true, forbidNonWhitelisted: true, 
      transform: true }),
  );
  await app.listen(3000, () => console.log('Server on port 3000'));
}
bootstrap();
