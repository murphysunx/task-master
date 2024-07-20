import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @ApiProperty({ required: false, nullable: true })
  readonly description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: string;
}
