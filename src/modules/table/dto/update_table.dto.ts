import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { TABLE_STATUS } from 'src/common/enums/table-status';

export class UpdateTableDTO {
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
