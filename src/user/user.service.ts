import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { User } from './entity/user/user';
import { CreateUserDto } from './dto/create-user/create-user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateUserDto): Promise<User> {
    const data = await this.prismaService.user.create({
      data: payload,
    });
    const user = new User(data);
    return user;
  }

  async findById(id: number): Promise<User | null> {
    const data = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!data) {
      return null;
    }
    const user = new User(data);
    return user;
  }
}
