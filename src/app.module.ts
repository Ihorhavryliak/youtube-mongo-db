import { EventEmitterModule } from '@nestjs/event-emitter';
import {
  CacheInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './tasks/task.module';
import { BullModule } from '@nestjs/bull';
import { AudioModule } from './audio/audio.module';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://yourit:Zazapu1995@cluster0.byszzuk.mongodb.net/?retryWrites=true&w=majority',
      }),
    }),
    UserModule,
    ScheduleModule.forRoot(),
    TaskModule,
    BullModule.forRootAsync({
      useFactory: () => ({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    }),
    AudioModule,
    EventEmitterModule.forRoot({
      wildcard: true
    }),
    FastifyMulterModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
