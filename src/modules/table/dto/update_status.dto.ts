import { IsEnum, IsNotEmpty } from 'class-validator';
import { TABLE_STATUS } from 'src/common/enums/table-status';

export class UpdateStatusDTO {
  @IsNotEmpty()
  @IsEnum(TABLE_STATUS)
  status: TABLE_STATUS;
}
