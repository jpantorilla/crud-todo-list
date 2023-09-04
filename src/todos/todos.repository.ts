import { Repository } from 'typeorm';
import { Todo, TodoStatus } from './todo.entity';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationTodoDto } from './dtos/pagination-todo.dto';

@Injectable()
export class TodosRepository {
  constructor(
    @InjectRepository(Todo)
    private r: Repository<Todo>
  ) {}

  getTodos(pagination: PaginationTodoDto): Promise<Todo[]> {
    let { page, limit } = pagination

    const query = this.r.createQueryBuilder('todo')

    if (page && limit) {
      query.offset((page - 1) * limit).limit(limit)
    }

    return query.getMany()
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