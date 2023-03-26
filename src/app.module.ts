import { CacheInterceptor, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import {CacheModule} from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheConfigService } from './user/cache/config.cache';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://yourit:Zazapu1995@cluster0.byszzuk.mongodb.net/?retryWrites=true&w=majority'
      }),
    }),
    UserModule,

  ],
  controllers: [],
  providers: [
  
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .forRoutes({path: 'user', method: RequestMethod.GET, version: '2'})
  }
}
