import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserType } from "./schema/user.schema";
import { CreateUserDto } from "./userDto/create-user.dto";
import {Cache} from 'cache-manager'

@Injectable()
export class UserService{
    constructor(@InjectModel('User') private userModel: Model<UserType>,
    @Inject(CACHE_MANAGER) private cacheMAnager: Cache){}

    async createUser(createUserDto: CreateUserDto): Promise<UserType>{
      const createUser = await this.userModel.create(createUserDto)
      return createUser;
    }

    async findAll(): Promise<UserType[]>{

      let value = await this.cacheMAnager.get('user') as UserType[] | null
      if(!value){
        const users = this.userModel.find().exec()
        await this.cacheMAnager.set('user', users, 0)
      }
      await this.cacheMAnager.reset()
      return value
    }

}