import { fastifyCookie } from '@fastify/cookie';
import { NestFastifyApplication, FastifyAdapter } from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from '@fastify/compress'



async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  await app.register(fastifyCookie, {
    secret: 'password123'
  })

  await app.register(compression, {encodings: ['gzip', 'deflate']})

  await app.listen(3000, () => console.log('Server on port 3000'));
}
bootstrap();
