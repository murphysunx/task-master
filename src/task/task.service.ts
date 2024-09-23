import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserNotFound } from '../user/exceptions/user-not-found/user-not-found';
import { UserService } from '../user/user.service';
import { CreateTaskListDto } from './dto/create-task-list/create-task-list';
import { CreateTaskDto } from './dto/create-task/create-task';
import { UpdateTaskListDto } from './dto/update-task-list/update-task-list';
import { Task } from './entity/task';
import { TaskList } from './entity/task-list';

@Injectable()
export class TaskService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, userId, description, listId } = createTaskDto;
    // check if the user exists
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UserNotFound(userId);
    }
    const result = await this.prismaService.task.create({
      data: {
        title,
        userId: userId,
        description,
        completed: false,
        listId,
      },
    });
    // construct the Task object
    const task = new Task(result);
    return task;
  }

  async getAllTasksByUserId(userId: number): Promise<Task[]> {
    const tasks = await this.prismaService.task.findMany({
      where: {
        userId,
      },
    });
    return tasks.map((task) => new Task(task));
  }

  async updateTaskById(
    taskId: number,
    updateTaskDto: Partial<Task>,
  ): Promise<Task> {
    const updatedTask = await this.prismaService.task.update({
      where: {
        id: taskId,
      },
      data: { ...updateTaskDto },
    });
    return new Task(updatedTask);
  }

  async deleteTaskById(taskId: number): Promise<Task> {
    const deletedTask = await this.prismaService.task.delete({
      where: {
        id: taskId,
      },
    });
    return new Task(deletedTask);
  }

  async toggleTaskCompletion(taskId: number): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task) {
      throw new Error(`Task with id ${taskId} not found`);
    }
    const updatedTask = await this.prismaService.task.update({
      where: {
        id: taskId,
      },
      data: {
        completed: !task.completed,
      },
    });
    return new Task(updatedTask);
  }

  async createTaskList(dto: CreateTaskListDto): Promise<TaskList> {
    const list = await this.prismaService.taskList.create({
      data: {
        name: dto.name,
        userId: dto.ownerId,
      },
    });
    return new TaskList(list);
  }

  async getAllTaskListsByUserId(userId: number): Promise<TaskList[]> {
    const lists = await this.prismaService.taskList.findMany({
      where: {
        userId,
      },
    });
    return lists.map((list) => new TaskList(list));
  }

  async updateTaskListById(
    taskListId: number,
    dto: UpdateTaskListDto,
  ): Promise<TaskList> {
    const updatedList = await this.prismaService.taskList.update({
      where: {
        id: taskListId,
      },
      data: {
        name: dto.name,
      },
    });
    return new TaskList(updatedList);
  }
}
