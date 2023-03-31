import { FastifyReply, FastifyRequest } from 'fastify';
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
  Req,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { CreateUserDto } from './userDto/create-user.dto';
import { Expose } from 'class-transformer';
import { Cookies } from 'src/decorators/cookies.decorator';


@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
   return this.userService.findAll()
  }
}
