import secureSession from '@fastify/secure-session';
import { fastifyCookie } from '@fastify/cookie';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from '@fastify/compress';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

    app.useStaticAssets({
      root: path.join(__dirname, '..', 'public'),
      prefix: '/public/'
    })
    
    app.setViewEngine({
      engine: {
        handlebars: require('handlebars')
      },
      templates: path.join(__dirname, '..', 'views')
    })
    
  await app.register(fastifyCookie, {
    secret: 'password123',
  });

  await app.register(secureSession, {
    secret: fs.readFileSync(path.join(__dirname, '..', 'secret-key.txt')),
    salt: 'mq9hDxBVDbspDR6n',
  });


  await app.register(compression, { encodings: ['gzip', 'deflate'] });

  await app.listen(3000, () => console.log('Server on port 3000'));
}
bootstrap();
