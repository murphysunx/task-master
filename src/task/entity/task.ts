import { ApiProperty } from '@nestjs/swagger';
import { task } from '@prisma/client';

export class Task implements task {
  @ApiProperty()
  id: bigint;

  @ApiProperty()
  completed: boolean;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  userId: bigint;

  constructor(data: Partial<Task>) {
    Object.assign(this, data);
  }
}
