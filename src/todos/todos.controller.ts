import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dtos/create-todo.dto';
import { UpdateTodoDto } from './dtos/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  getTodoList(): Todo[] {
    return this.todoService.getTodoList()
  }

  @Post()
  createTodo(@Body() body: CreateTodoDto): Todo {
    return this.todoService.createTodo(body)
  }

  @Get('/:id')
  getTodoById(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todoService.getTodoById(id)
  }

  @Patch('/:id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateTodoDto
  ): Todo {
    return this.todoService.updateTodo(id, body)
  }

  @Delete('/:id')
  deleteTodo(@Param('id', ParseIntPipe) id: number) {
    this.todoService.deleteTodo(id)
  }
}
