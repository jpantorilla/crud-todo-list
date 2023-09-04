import { IsEnum, IsOptional } from 'class-validator'
import { TodoStatus } from '../todo.entity'

export class UpdateTodoDto {
  @IsOptional()
  title?: string

  @IsOptional()
  description?: string

  @IsOptional()
  @IsEnum(TodoStatus)
  status?: TodoStatus
}