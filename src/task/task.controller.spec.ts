import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { UserNotFound } from 'src/user/exceptions/user-not-found/user-not-found';
import { Task } from './domain/task';
import { CreateTask } from './dto/create-task/create-task.interface';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

describe('TaskController', () => {
  let controller: TaskController;
  const taskService: DeepMockProxy<TaskService> = mockDeep<TaskService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: TaskService,
          useValue: taskService,
        },
      ],
    }).compile();

    controller = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create task with CreateTaskDto', async () => {
    const createTaskDto: CreateTask = {
      title: 'Task 1',
      description: 'Description 1',
      userId: '1',
    };
    const expectedTask: Task = new Task(
      '1',
      createTaskDto.title,
      '2022-11-16',
      '2022-11-16',
      createTaskDto.userId,
    );
    expectedTask.setDescription(createTaskDto.description!);
    taskService.createTask.mockResolvedValue(expectedTask);
    const task = await controller.create(createTaskDto);
    expect(taskService.createTask).toHaveBeenCalledWith(createTaskDto);
    expect(task).toEqual(expectedTask);
  });

  it('should throw an error if the user does not exist', async () => {
    const createTaskDto: CreateTask = {
      title: 'Task 1',
      description: 'Description 1',
      userId: '1',
    };
    taskService.createTask.mockRejectedValue(
      new UserNotFound(createTaskDto.userId),
    );
    await expect(controller.create(createTaskDto)).rejects.toThrow(
      UserNotFound,
    );
  });
});
