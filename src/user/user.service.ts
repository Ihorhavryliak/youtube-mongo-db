import { EventEmitter2 } from '@nestjs/event-emitter';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserType } from './schema/user.schema';
import { CreateUserDto } from './userDto/create-user.dto';
import { Cache } from 'cache-manager';
import { UserCreateEvent } from './events/user-created.event';



@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserType>,
  private eventEmitter2: EventEmitter2) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserType> {
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  async findAll(): Promise<UserType[]> {
    const users = this.userModel.find().exec();
    const userCreateEvent = new UserCreateEvent()
    userCreateEvent.name = 'Notification'
    userCreateEvent.description = 'some text'
    this.eventEmitter2.emit('user.created', userCreateEvent)
    return users;
  }
}
