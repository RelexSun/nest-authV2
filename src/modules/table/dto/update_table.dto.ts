import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { TABLE_STATUS } from 'src/common/enums/table-status';

export class UpdateTableDTO {
  @ApiProperty({ description: 'update number of table', example: '3' })
  @IsNotEmpty()
  @IsInt()
  number: number;

  @ApiProperty({
    description: 'amount of seat in a table',
    example: '4',
  })
  @IsNotEmpty()
  @IsInt()
  seatAmount: number;

  @ApiProperty({ description: 'status of table', example: 'available' })
  @IsNotEmpty()
  @IsEnum(TABLE_STATUS)
  status: TABLE_STATUS;
}
