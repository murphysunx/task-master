import { Controller } from '@nestjs/common';
import { Task } from './domain/task';
import { CreateTask } from './dto/create-task/create-task.interface';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  async create(createTaskDto: CreateTask): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
}
