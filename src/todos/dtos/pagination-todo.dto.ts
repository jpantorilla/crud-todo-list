import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationTodoDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(({value}) => Number.parseInt(value))
  page: number

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @Transform(({value}) => Number.parseInt(value))
  limit: number
}