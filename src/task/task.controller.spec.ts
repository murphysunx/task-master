import { Test, TestingModule } from '@nestjs/testing';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { UserNotFound } from 'src/user/exceptions/user-not-found/user-not-found';
import { CreateTaskListDto } from './dto/create-task-list/create-task-list';
import { CreateTaskDto } from './dto/create-task/create-task';
import { Task } from './entity/task';
import { TaskList } from './entity/task-list';
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
    const createTaskDto: CreateTaskDto = {
      title: 'Task 1',
      description: 'Description 1',
      userId: 1,
    };
    const expectedTask: Task = new Task({
      id: 1,
      title: createTaskDto.title,
      userId: createTaskDto.userId,
      completed: false,
      description: createTaskDto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    taskService.createTask.mockResolvedValue(expectedTask);
    const task = await controller.create(createTaskDto);
    expect(taskService.createTask).toHaveBeenCalledWith(createTaskDto);
    expect(task).toEqual(expectedTask);
  });

  it('should throw an error if the user does not exist', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Task 1',
      description: 'Description 1',
      userId: 1,
    };
    taskService.createTask.mockRejectedValue(
      new UserNotFound(createTaskDto.userId),
    );
    await expect(controller.create(createTaskDto)).rejects.toThrow(
      UserNotFound,
    );
  });

  it('should delete task by taskId', async () => {
    const taskId = 1;
    const expectedTask: Task = new Task({
      id: 1,
      title: 'Task 1',
      userId: 1,
      completed: false,
      description: 'Description 1',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    taskService.deleteTaskById.mockResolvedValue(expectedTask);
    const task = await controller.delete(taskId);
    expect(taskService.deleteTaskById).toHaveBeenCalledWith(taskId);
    expect(task).toEqual(expectedTask);
  });

  it('should get all tasks by userId', async () => {
    const userId = 1;
    const expectedTasks: Task[] = [
      new Task({
        id: 1,
        title: 'Task 1',
        userId: 1,
        completed: false,
        description: 'Description 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];
    taskService.getAllTasksByUserId.mockResolvedValue(expectedTasks);
    taskService.getAllTaskListsByUserId.mockResolvedValueOnce([]);
    const result = await controller.getByUserId(userId);
    expect(taskService.getAllTasksByUserId).toHaveBeenCalledWith(userId);
    expect(taskService.getAllTaskListsByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual({ lists: [], tasks: expectedTasks });
  });

  it('should update task by taskId', async () => {
    const taskId = 1;
    const updateTaskDto = {
      title: 'Task 1',
      description: 'Description 1',
      completed: true,
    };
    const expectedTask: Task = new Task({
      id: 1,
      title: updateTaskDto.title,
      userId: 1,
      completed: updateTaskDto.completed,
      description: updateTaskDto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    taskService.updateTaskById.mockResolvedValue(expectedTask);
    const task = await controller.update(taskId, updateTaskDto);
    expect(taskService.updateTaskById).toHaveBeenCalledWith(
      taskId,
      updateTaskDto,
    );
    expect(task).toEqual(expectedTask);
  });

  it('should create task list', async () => {
    const createTaskListDto = {
      name: 'Task List 1',
      ownerId: 1,
    } satisfies CreateTaskListDto;
    const expectedTaskList = {
      id: 1,
      name: createTaskListDto.name,
      userId: createTaskListDto.ownerId,
      createdAt: new Date(),
      updatedAt: new Date(),
    } satisfies TaskList;
    taskService.createTaskList.mockResolvedValue(expectedTaskList);
    const taskList = await controller.createTaskList(createTaskListDto);
    expect(taskService.createTaskList).toHaveBeenCalledWith(createTaskListDto);
    expect(taskList).toEqual(expectedTaskList);
  });

  it('Should update task list by listId', async () => {
    const listId = 1;
    const updateTaskListDto = {
      name: 'Task List 1',
    };
    const expectedTaskList = {
      id: listId,
      name: updateTaskListDto.name,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    } satisfies TaskList;
    taskService.updateTaskListById.mockResolvedValue(expectedTaskList);
    const taskList = await controller.updateTaskList(listId, updateTaskListDto);
    expect(taskService.updateTaskListById).toHaveBeenCalledWith(
      listId,
      updateTaskListDto,
    );
    expect(taskList).toEqual(expectedTaskList);
  });

  it('Should delete task list by listId', async () => {
    const listId = 1;
    const expectedTaskList = {
      id: listId,
      name: 'Task List 1',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    } satisfies TaskList;
    taskService.deleteTaskListById.mockResolvedValue(expectedTaskList);
    const taskList = await controller.deleteTaskList(listId);
    expect(taskService.deleteTaskListById).toHaveBeenCalledWith(listId);
    expect(taskList).toEqual(expectedTaskList);
  });
});
