import { ApiProperty } from '@nestjs/swagger';
import { taskList } from '@prisma/client';

export class TaskList implements taskList {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  userId: number;

  constructor(data: Partial<taskList>) {
    Object.assign(this, data);
  }
}
