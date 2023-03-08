import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserType } from "./schema/user.schema";
import { CreateUserDto } from "./userDto/create-user.dto";

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private userModel: Model<UserType>){}

    async createUser(createUserDto: CreateUserDto): Promise<UserType>{
      const createUser = await this.userModel.create(createUserDto)
      return createUser;
    }

    async findAll(): Promise<UserType[]>{
      return this.userModel.find().exec()
    }

}