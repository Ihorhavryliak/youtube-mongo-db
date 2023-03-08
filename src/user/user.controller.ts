
import { UserService } from './user.service';
import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from './userDto/create-user.dto';



@Controller()
export class UserController {
  constructor(private userService: UserService){}
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

  @Get()
  async findAll(): Promise<any>{
    return this.userService.findAll();
  }
}