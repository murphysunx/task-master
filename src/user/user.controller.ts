import { Body, Controller, Post } from '@nestjs/common';
import { User } from './domain/user/user';
import { CreateUser } from './dto/create-user/create-user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUser): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
