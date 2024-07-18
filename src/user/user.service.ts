import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from './domain/user/user';
import { CreateUser } from './dto/create-user/create-user.interface';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(payload: CreateUser): Promise<User> {
    const data = await this.prismaService.user.create({
      data: payload,
    });
    const user = new User(
      data.id.toString(),
      data.name,
      data.createdAt.toString(),
      data.updatedAt.toString(),
    );
    user.setEmail(data.email);
    user.setPassword(data.password);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const data = await this.prismaService.user.findUnique({
      where: { id: BigInt(id) },
    });
    if (!data) {
      return null;
    }
    const user = new User(
      data.id.toString(),
      data.name,
      data.createdAt.toString(),
      data.updatedAt.toString(),
    );
    user.setEmail(data.email);
    user.setPassword(data.password);
    return user;
  }
}
