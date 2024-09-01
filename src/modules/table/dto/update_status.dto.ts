import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { TABLE_STATUS } from 'src/common/enums/table-status';

export class UpdateStatusDTO {
  @ApiProperty({ description: 'status of table', example: 'occupied' })
  @IsNotEmpty()
  @IsEnum(TABLE_STATUS)
  status: TABLE_STATUS;
}
