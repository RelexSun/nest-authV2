import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateShopDTO {
  @ApiProperty({ description: 'name of the shop', example: 'Burger king' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 225)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'location of the shop',
    example: 'Toul Kork, Phnom Penh',
  })
  @IsString()
  @Length(0, 225)
  @IsNotEmpty()
  location: string;

  @ApiProperty({ description: "user's identifier" })
  @IsNotEmpty()
  @IsString()
  user_id: string;
}
