import { CacheInterceptor, Module } from '@nestjs/common';
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
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useExisting: CacheConfigService
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    }
  ],
})
export class AppModule {}
