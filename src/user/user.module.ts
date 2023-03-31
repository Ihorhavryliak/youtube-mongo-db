import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserCreatedListener } from "./listeners/order-created.listener";
import { UserSchema } from "./schema/user.schema";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";




@Module({
  imports: [MongooseModule.forFeature([{name: 'User', schema: UserSchema}])],
  controllers: [UserController],
  providers: [UserService, UserCreatedListener]
}
)

export class UserModule {}