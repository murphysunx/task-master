import { OmitType, PartialType } from '@nestjs/swagger';
import { Task } from 'src/task/entity/task';

export class UpdateTaskDto extends PartialType(
  OmitType(Task, ['id', 'createdAt', 'updatedAt', 'userId'] as const),
) {}
