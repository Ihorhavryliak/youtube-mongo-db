import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserCreatedListener } from "./listeners/order-created.listener";
import { UserSchema } from "./schema/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { HttpModule } from "@nestjs/axios";




@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),     HttpModule.registerAsync({
    useFactory: () => ({
      timeout: 5000,
      maxRedirects: 5,
    }),
  })],
  controllers: [UserController],
  providers: [UserService, UserCreatedListener]
}
)

export class UserModule {}