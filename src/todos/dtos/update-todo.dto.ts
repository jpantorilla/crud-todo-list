import { TodoStatus } from '../todo.entity'

export class UpdateTodoDto {
  title: string
  description: string
  status: TodoStatus
}