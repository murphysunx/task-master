import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user/create-user.interface';
import { User } from './entity/user/user';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }
}
