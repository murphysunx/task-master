import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  providers: [TaskService, PrismaService],
  controllers: [TaskController],
})
export class TaskModule {}
