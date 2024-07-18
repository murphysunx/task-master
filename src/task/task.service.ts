import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserNotFound } from '../user/exceptions/user-not-found/user-not-found';
import { UserService } from '../user/user.service';
import { Task } from './domain/task';
import { CreateTask } from './dto/create-task/create-task.interface';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async createTask(createTaskDto: CreateTask): Promise<Task> {
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
    const task = new Task(
      result.id.toString(),
      result.title,
      result.createdAt.toString(),
      result.updatedAt.toString(),
      result.userId.toString(),
    );
    if (result.description) {
      task.setDescription(result.description);
    }
    return task;
  }
}
