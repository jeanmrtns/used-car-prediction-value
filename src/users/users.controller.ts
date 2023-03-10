import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';

@Serialize(UserDto)
@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Get('/')
  async findAllUsersByEmail(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Patch('/update/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(Number(id), {
      email: body.email,
      password: body.password,
    });
  }

  @Delete('/remove/:id')
  async removeUser(@Param('id') id: string) {
    return this.usersService.remove(Number(id));
  }
}
