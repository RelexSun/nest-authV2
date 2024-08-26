import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateShopDTO {
  @IsNotEmpty()
  @IsString()
  @Length(1, 225)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(0, 225)
  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  user_id: string;

  @IsInt()
  @IsNotEmpty()
  table: number;
}
