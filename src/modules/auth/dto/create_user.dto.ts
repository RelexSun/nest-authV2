import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { GENDER } from 'src/common/enums/gender';

export class CreateUserDto {
  @ApiProperty({ description: 'Last Name of the user', example: 'Sok' })
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({ description: 'First Name of the user', example: 'Dara' })
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({ description: 'Username of the user', example: 'dara123' })
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
  @Matches(/^\S*$/, { message: 'Username should not contain spaces' })
  username: string;

  @ApiProperty({
    description: "User's email",
    example: 'Sok.dara@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: "User's password", example: '12345Dara' })
  @IsNotEmpty()
  password: string;

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
  @IsDate()
  dob: Date;
}
