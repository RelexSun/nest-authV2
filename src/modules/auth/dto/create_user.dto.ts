import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Name of the user', example: 'Sok Dara' })
  @IsString()
  @Length(2, 100)
  @IsNotEmpty()
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
}
