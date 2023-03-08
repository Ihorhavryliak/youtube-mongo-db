import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
      cache: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://yourit:Zazapu1995@cluster0.byszzuk.mongodb.net/?retryWrites=true&w=majority',
    ),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
