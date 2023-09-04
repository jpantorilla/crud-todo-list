import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class PaginationTodoDto {
  @IsOptional()
  @IsNumber()
  @Transform(({value}) => Number.parseInt(value))
  page: number

  @IsOptional()
  @IsNumber()
  @Transform(({value}) => Number.parseInt(value))
  limit: number
}