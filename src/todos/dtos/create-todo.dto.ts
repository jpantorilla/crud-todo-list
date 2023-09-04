import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateTodoDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string

  @ApiPropertyOptional()
  @IsOptional()
  description?: string
}