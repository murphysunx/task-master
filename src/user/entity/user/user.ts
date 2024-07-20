import { ApiProperty } from '@nestjs/swagger';
import { user } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class User implements user {
  @Transform(({ value }) => value.toString())
  @ApiProperty()
  id: bigint;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @Exclude()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(data: Partial<User>) {
    Object.assign(this, data);
  }
}
