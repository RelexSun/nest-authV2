import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { GENDER } from 'src/common/enums/gender';

export class UpdateUserDto {
  @ApiProperty({ description: 'Name of the user', example: 'Sok Dara' })
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: "User's age", example: 22 })
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @ApiProperty({ description: "User's gender", example: 'Male' })
  @IsEnum(GENDER)
  @IsNotEmpty()
  gender: GENDER;

  @ApiProperty({ description: "User's phone number", example: '010123321' })
  @IsNotEmpty()
  phone_number: string;

  @ApiProperty({ description: "User's DOB", example: '2000-12-12' })
  @IsNotEmpty()
  DOB: string;
}
