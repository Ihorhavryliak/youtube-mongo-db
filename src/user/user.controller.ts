import { UserService } from './user.service';
import {
  BadRequestException,
  Body,
  CacheInterceptor,
  CacheKey,
  CacheTTL,
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
} from '@nestjs/common';
import { CreateUserDto } from './userDto/create-user.dto';

@Controller()

export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async createUser(
    @Body(new ParseArrayPipe({ items: CreateUserDto }))
    createUserDto: CreateUserDto[],
  ) {
    return this.userService.createUser(createUserDto[0]);
  }

  @Get()
  @CacheKey('users')
  @CacheTTL(30)
  async findAll(
    @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
    ids: number[],
  ) {
    return this.userService.findAll();
  }
}
