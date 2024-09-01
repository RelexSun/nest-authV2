import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateShopDTO {
  @ApiProperty({ description: 'name of the shop', example: 'Burger king' })
  @IsNotEmpty()
  @IsString()
  @Length(1, 225)
  name: string;

  @ApiProperty({
    description: 'location of the shop',
    example: 'Toul Kork, Phnom Penh',
  })
  @IsNotEmpty()
  @IsString()
  @Length(0, 225)
  location: string;
}
