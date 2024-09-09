import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskListDto } from './dto/create-task-list/create-task-list';
import { CreateTaskDto } from './dto/create-task/create-task';
import { UpdateTaskDto } from './dto/update-task/update-task';
import { Task } from './entity/task';
import { TaskList } from './entity/task-list';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Delete(':taskId')
  async delete(@Param('taskId', ParseIntPipe) taskId: number): Promise<Task> {
    return this.taskService.deleteTaskById(taskId);
  }

  @Get()
  async getByUserId(
    @Query('userId', ParseIntPipe) userId: number,
  ): Promise<Task[]> {
    return this.taskService.getAllTasksByUserId(userId);
  }

  @Patch(':taskId')
  async update(
    @Param('taskId', ParseIntPipe) taskId: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.updateTaskById(taskId, updateTaskDto);
  }

  @Post('lists')
  async createTaskList(
    @Body() createTaskListDto: CreateTaskListDto,
  ): Promise<TaskList> {
    return this.taskService.createTaskList(createTaskListDto);
  }
}
