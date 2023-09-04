import { IsEnum, IsOptional } from 'class-validator'
import { TodoStatus } from '../todo.entity'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateTodoDto {
  @ApiPropertyOptional()
  @IsOptional()
  title?: string

  @ApiPropertyOptional()
  @IsOptional()
  description?: string

  @ApiPropertyOptional({ enum: TodoStatus })
  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus
}