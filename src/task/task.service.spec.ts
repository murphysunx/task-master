import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'nestjs-prisma';
import { User } from '../user/entity/user/user';
import { UserNotFound } from '../user/exceptions/user-not-found/user-not-found';
import { UserService } from '../user/user.service';
import { CreateTaskDto } from './dto/create-task/create-task';
import { Task } from './entity/task';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task/update-task';

describe('TaskService', () => {
  let taskService: TaskService;
  const userService = mockDeep<UserService>();
  const prisma: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: UserService,
          useValue: userService,
        },
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    taskService = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should create a task with a title and a userId', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Task 1',
      userId: 1,
    };
    // mock the userService.findById method
    const expectedUser: User = new User({
      id: 1,
      name: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    userService.findById.mockReturnValueOnce(Promise.resolve(expectedUser));
    // mock created task
    const expectedTask: Awaited<ReturnType<typeof prisma.task.create>> = {
      id: 1,
      title: createTaskDto.title,
      userId: expectedUser.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      completed: false,
      description: null,
    };
    prisma.task.create.mockResolvedValueOnce(expectedTask);
    const createdTask: Task = await taskService.createTask(createTaskDto);
    // should check if the user exists first
    expect(userService.findById).toHaveBeenCalledWith(createTaskDto.userId);
    // then should create expected task
    expect(prisma.task.create).toHaveBeenCalledWith({
      data: {
        title: createTaskDto.title,
        userId: expectedUser.id,
        completed: false,
        description: void 0,
      } as Parameters<typeof prisma.task.create>[0]['data'],
    });
    expect(createdTask.id.toString()).toBe(expectedTask.id.toString());
    expect(createdTask.title).toBe(expectedTask.title);
    expect(createdTask.userId).toBe(expectedUser.id);
    expect(createdTask.description).toBe(expectedTask.description);
    expect(createdTask.completed).toBe(expectedTask.completed);
    expect(createdTask.createdAt).toEqual(expectedTask.createdAt);
    expect(createdTask.updatedAt).toEqual(expectedTask.updatedAt);
  });

  it('should throw UserNotFoundException if the user does not exist', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Task 1',
      userId: 1,
    };
    userService.findById.mockReturnValueOnce(Promise.resolve(null));
    await expect(taskService.createTask(createTaskDto)).rejects.toThrow(
      UserNotFound,
    );
  });

  it('should get all tasks of a user', async () => {
    const userId = 1;
    prisma.task.findMany.mockResolvedValueOnce([]);
    await taskService.getAllTasksByUserId(userId);
    expect(prisma.task.findMany).toHaveBeenCalledWith({
      where: {
        userId: userId,
      },
    });
  });

  it('should update a task partially by id', async () => {
    const taskId = 1;
    const updateTaskDto: UpdateTaskDto = {
      title: 'Task 1',
      completed: true,
      description: 'Description',
    };
    const expectedTask: Task = new Task({
      id: taskId,
      title: updateTaskDto.title,
      userId: 1,
      description: null,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    prisma.task.update.mockResolvedValueOnce(expectedTask);
    const updatedTask = await taskService.updateTaskById(taskId, updateTaskDto);
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: {
        id: taskId,
      },
      data: {
        ...updateTaskDto,
      },
    });
    expect(updatedTask).toEqual(expectedTask);
  });

  it('should delete a task by id', async () => {
    const taskId = 1;
    prisma.task.delete.mockResolvedValueOnce({
      id: taskId,
      title: 'Task 1',
      userId: 1,
      description: null,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await taskService.deleteTaskById(taskId);
    expect(prisma.task.delete).toHaveBeenCalledWith({
      where: {
        id: taskId,
      },
    });
  });

  it('should toggle the completion status of a task', async () => {
    const taskId = 1;
    const task: Task = new Task({
      id: taskId,
      title: 'Task 1',
      userId: 1,
      description: null,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    prisma.task.findUnique.mockResolvedValueOnce(task);
    prisma.task.update.mockResolvedValueOnce(task);
    const updatedTask = await taskService.toggleTaskCompletion(taskId);
    expect(prisma.task.update).toHaveBeenCalledWith({
      where: {
        id: taskId,
      },
      data: {
        completed: !task.completed,
      },
    });
    expect(updatedTask).toEqual(task);
  });
});
