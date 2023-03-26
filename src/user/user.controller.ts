import { UserService } from './user.service';
import {
  BadRequestException,
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { CreateUserDto } from './userDto/create-user.dto';
import { Expose } from 'class-transformer';

@Controller(

)

export class UserController {
  constructor(private userService: UserService) {}

 
  @Get()
  async findAll(): Promise<CreateUserDto> {
    return  new CreateUserDto({
      name: 'Taras',
      lastName: 'One',
      password: '1234'
    })
  }


 


  
}
