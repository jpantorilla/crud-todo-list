import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateTodoDto {
  @IsNotEmpty()
  title: string

  @IsOptional()
  description?: string
}