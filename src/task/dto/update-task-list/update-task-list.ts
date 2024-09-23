import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskListDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;
}
