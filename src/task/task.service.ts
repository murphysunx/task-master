import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserNotFound } from '../user/exceptions/user-not-found/user-not-found';
import { UserService } from '../user/user.service';
import { CreateTaskDto } from './dto/create-task/create-task.interface';
import { Task } from './entity/task';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, userId, description } = createTaskDto;
    // check if the user exists
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UserNotFound(userId);
    }
    const result = await this.prismaService.task.create({
      data: {
        title,
        userId: BigInt(userId),
        description,
        completed: false,
      },
    });
    // construct the Task object
    const task = new Task(result);
    return task;
  }
}
