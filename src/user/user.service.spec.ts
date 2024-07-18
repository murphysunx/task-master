import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/prisma.service';
import { CreateUser } from './dto/create-user/create-user.interface';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const prisma: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user with a name, email, and password', async () => {
    const payload: CreateUser = {
      name: 'John Doe',
      email: 'test@google.com',
      password: 'password',
    };
    const createdUser: Awaited<ReturnType<typeof prisma.user.create>> = {
      id: BigInt(1),
      ...payload,
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    };
    const mockImpl: typeof prisma.user.create = (async () => {
      return createdUser;
    }) as any;
    prisma.user.create.mockImplementationOnce(mockImpl);
    const user = await service.create(payload);
    expect(prisma.user.create).toHaveBeenCalledWith({ data: payload });
    expect(user).toBeDefined();
    expect(user.id).toBe(createdUser.id.toString());
    expect(user.getName()).toBe(createdUser.name);
    expect(user.getEmail()).toBe(createdUser.email);
    expect(user.getPassword()).toBe(createdUser.password);
    expect(user.getCreatedAt()).toBe(createdUser.createdAt.toString());
    expect(user.getUpdatedAt()).toBe(createdUser.updatedAt.toString());
  });

  it('should get a user by id', async () => {
    const id = BigInt(1);
    const expectedUser: Awaited<ReturnType<typeof prisma.user.findUnique>> = {
      id,
      name: 'John Doe',
      email: 'test@google.com',
      password: 'password',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    };
    const mockImpl: typeof prisma.user.findUnique = (async () => {
      return expectedUser;
    }) as any;
    prisma.user.findUnique.mockImplementationOnce(mockImpl);
    const foundUser = await service.findById(id.toString());
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id } });
    expect(foundUser).toBeDefined();
    expect(foundUser!.id).toBe(expectedUser.id.toString());
    expect(foundUser!.getName()).toBe(expectedUser.name);
    expect(foundUser!.getEmail()).toBe(expectedUser.email);
    expect(foundUser!.getPassword()).toBe(expectedUser.password);
    expect(foundUser!.getCreatedAt()).toBe(expectedUser.createdAt.toString());
    expect(foundUser!.getUpdatedAt()).toBe(expectedUser.updatedAt.toString());
  });

  it('should return null if user is not found', async () => {
    const id = BigInt(1);
    const mockImpl: typeof prisma.user.findUnique = (async () => {
      return null;
    }) as any;
    prisma.user.findUnique.mockImplementationOnce(mockImpl);
    const foundUser = await service.findById(id.toString());
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id } });
    expect(foundUser).toBeNull();
  });
});
