import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, nullable: true })
  readonly description?: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;
}
