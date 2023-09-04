export class Todo {
  id: number
  title: string
  description: string
  status: TodoStatus
}

export enum TodoStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}