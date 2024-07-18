import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TaskService } from './task.service';

@Module({
  providers: [TaskService, PrismaService],
})
export class TaskModule {}
