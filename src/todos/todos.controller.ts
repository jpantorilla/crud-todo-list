import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { PaginationTodoDto } from './dtos/pagination-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  getTodoList(@Query() pagination: PaginationTodoDto): Promise<Todo[]> {
    return this.todoService.getTodoList(pagination)
  }

  @Post()
  createTodo(@Body() body: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(body)
  }

  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.getTodoById(id)
  }

  @Patch('/:id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTodoDto
  ): Promise<Todo> {
    return this.todoService.updateTodo(id, body)
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number): void {
    this.todoService.deleteTodo(id)
  }
}
