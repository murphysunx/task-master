import { Controller, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task/create-task';
import { Task } from './entity/task';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
}
