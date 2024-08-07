import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty({ required: false, nullable: true })
  readonly description?: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;
}
