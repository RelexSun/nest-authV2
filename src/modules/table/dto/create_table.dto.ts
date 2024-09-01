import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { TABLE_STATUS } from 'src/common/enums/table-status';

export class CreateTableDTO {
  @ApiProperty({
    description: 'Shop unique identifier',
    example: 'shop_id',
  })
  @IsNotEmpty()
  @IsString()
  shop_id: string;

  @ApiProperty({ description: 'number of table', example: '3' })
  @IsNotEmpty()
  @IsInt()
  number: number;

  @ApiProperty({ description: 'number of seat', example: '4' })
  @IsNotEmpty()
  @IsInt()
  seatAmount: number;

  @ApiProperty({ description: 'status of table', example: 'available' })
  @IsNotEmpty()
  @IsEnum(TABLE_STATUS)
  status: TABLE_STATUS;
}
