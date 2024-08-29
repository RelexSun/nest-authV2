import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateShopDTO {
  @IsNotEmpty()
  @IsString()
  @Length(1, 225)
  name: string;

  @IsString()
  @Length(0, 225)
  location: string;

  @IsInt()
  table: number;
}
