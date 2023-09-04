import { Repository } from 'typeorm';
import { Todo, TodoStatus } from './todo.entity';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodosRepository {
  constructor(
    @InjectRepository(Todo)
    private r: Repository<Todo>
  ) {}

  getTodos(): Promise<Todo[]> {
    return this.r.createQueryBuilder('todo').getMany()
  }

  createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { title, description } = createTodoDto
    const todo = this.r.create({
      title,
      description,
      status: TodoStatus.PENDING
    })

    return this.r.save(todo)
  }

  get repo(): Repository<Todo> {
    return this.r
  }
}