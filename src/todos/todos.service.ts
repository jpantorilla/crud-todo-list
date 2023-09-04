import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo, TodoStatus } from './todo.entity';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Injectable()
export class TodosService {
  todoList: Todo[] = []

  getTodoList(): Todo[] {
    return this.todoList
  }

  createTodo(createTodoDto: CreateTodoDto): Todo {
    const { title, description } = createTodoDto
    const todo: Todo = {
      id: this.todoList.length + 1,
      title,
      description,
      status: TodoStatus.PENDING
    }

    this.todoList.push(todo)
    return todo
  }

  getTodoById(id: number): Todo {
    const foundTodo = this.todoList.find(todo => todo.id === id)

    if (!foundTodo) {
      throw new NotFoundException(`Todo with ID: ${id} not found.`)
    }

    return foundTodo
  }

  updateTodo(id: number, updateTodoDto: UpdateTodoDto): Todo {
    const foundTodo = this.getTodoById(id)
    for (let [key, value] of Object.entries(updateTodoDto)) {
      foundTodo[key] = value      
    }

    return foundTodo
  }

  deleteTodo(id: number): void {
    this.todoList = this.todoList.filter(todo => todo.id !== id)
  }
}
