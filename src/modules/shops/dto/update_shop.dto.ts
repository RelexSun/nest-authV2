import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateShopDTO {
  @IsNotEmpty()
  @IsString()
  @Length(1, 225)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(0, 225)
  @IsNotEmpty()
  location: string;

  @IsInt()
  @IsNotEmpty()
  table: number;
}
