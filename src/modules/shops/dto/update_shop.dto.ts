import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdateShopDTO {
  @IsNotEmpty()
  @IsString()
  @Length(1, 225)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 225)
  location: string;
}
