import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.entity';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(private todoRepository: TodosRepository) {}

  getTodoList(): Promise<Todo[]> {
    return this.todoRepository.getTodos()
  }

  createTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoRepository.createTodo(createTodoDto)
  }

  async getTodoById(id: number): Promise<Todo> {
    const foundTodo = await this.todoRepository.repo.findOne({ where: { id } })
    
    if (!foundTodo) {
      throw new NotFoundException(`Todo with ID: ${id} not found.`)
    }

    return foundTodo
  }

  async updateTodo(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    let todo = await this.getTodoById(id)
    todo = {
      ...todo,
      ...updateTodoDto
    }

    return this.todoRepository.repo.save(todo)
  }

  async deleteTodo(id: number): Promise<void> {
    const result = await this.todoRepository.repo.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Todo with ID: ${id} not found.`)
    }
  }
}
