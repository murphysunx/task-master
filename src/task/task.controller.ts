import { Controller } from '@nestjs/common';
import { Task } from './entity/task';
import { CreateTaskDto } from './dto/create-task/create-task.interface';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }
}
