import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TABLE_STATUS } from 'src/common/enums/table-status';

export class CreateTableDTO {
  @IsNotEmpty()
  @IsString()
  shop_id: string;

  @IsNotEmpty()
  @IsInt()
  number: number;

  @IsNotEmpty()
  @IsInt()
  seatAmount: number;

  @IsNotEmpty()
  @IsEnum(TABLE_STATUS)
  status: TABLE_STATUS;
}
