import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user/create-user.interface';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  const createUser: jest.Mock = jest.fn();

  beforeEach(async () => {
    userService = {
      create: createUser,
    } as any;
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user with a name, email, and password', async () => {
    const createUserDto: CreateUserDto = {
      name: 'John Doe',
      email: 'test@google.com',
      password: 'password',
    };
    await controller.createUser(createUserDto);
    expect(userService.create).toHaveBeenCalledWith(createUserDto);
  });
});
