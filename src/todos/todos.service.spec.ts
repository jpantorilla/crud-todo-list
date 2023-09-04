import { Test } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';
import { Todo, TodoStatus } from './todo.entity';
import * as Chance from 'chance'
import { CreateTodoDto } from './dtos/create-todo.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateTodoDto } from './dtos/update-todo.dto';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockTodosRepository = () => ({
  getTodos: jest.fn(),
  createTodo: jest.fn(),
  repo: {
    findOne: jest.fn(),
    save: v => v,
    delete: jest.fn()
  }
})

// helper fns
const chance = new Chance() 
const createTodo = (): Todo => ({
  id: chance.integer(),
  title: chance.word({ length: 5 }),
  description: chance.sentence({ words: 3 }),
  status: TodoStatus.PENDING
})
const createTodoList = (num: number): Todo[] => new Array(num).fill(undefined).map(createTodo)

describe('TodosService', () => {
  let todosService: TodosService
  let todosRepository: TodosRepository

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TodosService,
        { provide: TodosRepository, useFactory: mockTodosRepository }
      ],
    }).compile()

    todosService = module.get(TodosService)
    todosRepository = module.get(TodosRepository)
  })

  //

  describe('getTodoList', () => {
    it('calls TodosRepository.getTodos and returns the result', async () => {
      const todoList = createTodoList(2);

      (todosRepository.getTodos as jest.Mock).mockResolvedValue(todoList)
      const result = await todosService.getTodoList(null)

      expect(result).toEqual(todoList)
    })
  })

  describe('createTodo', () => {
    it('calls TodoRepository.createTodo and returns a result', async () => {
      const todoItem = createTodo();

      (todosRepository.createTodo as jest.Mock).mockResolvedValue(todoItem)
      const createTodoDto: CreateTodoDto = {
        title: todoItem.title,
        description: todoItem.description
      }
      const result = await todosService.createTodo(createTodoDto)
      
      expect(result).toEqual(todoItem)
    })
  })

  describe('getTodoById', () => {
    it('calls TodosRepository.findOne and returns a result', async () => {
      const todoItem = createTodo();

      (todosRepository.repo.findOne as jest.Mock).mockResolvedValue(todoItem)
      const result = await todosService.getTodoById(todoItem.id)

      expect(result).toEqual(todoItem)
    })

    it('calls TodosRepository.findOne and throws an error when id is not present', async () => {
      const todoItem = createTodo();

      (todosRepository.repo.findOne as jest.Mock).mockResolvedValue(null)
      expect(todosService.getTodoById(todoItem.id))
        .rejects.toThrow(new NotFoundException(`Todo with ID: ${todoItem.id} not found.`))
    })
  })

  describe('updateTodo', () => {
    it('updates a record if it exists', async () => {
      const todoItem = createTodo()

      const updateValues: UpdateTodoDto = {
        description: 'updated description',
        status: TodoStatus.COMPLETED
      }
      const updatedTodoItem: Todo = {
        ...todoItem,
        ...updateValues
      };
      
      (todosRepository.repo.findOne as jest.Mock).mockResolvedValue(todoItem)
      const result = await todosService.updateTodo(todoItem.id, updateValues)

      expect(result).toEqual(updatedTodoItem)
    })

    it('throws an error if trying to update a non-existing todo item', () => {
      const id = chance.integer();

      (todosRepository.repo.findOne as jest.Mock).mockResolvedValue(null)
      expect(todosService.updateTodo(id, {}))
        .rejects.toThrow(new NotFoundException(`Todo with ID: ${id} not found.`))
    })
  })

  describe('deleteTodo', () => {
    it('to succeed silently when successfully deleting a todo item', async () => {
      (todosRepository.repo.delete as jest.Mock).mockResolvedValue({ affected: 1 })

      expect(todosService.deleteTodo(1)).resolves.not.toThrow()
    })

    it('throws an error if trying to delete a non-existing todo item', () => {
      const id = 1;

      (todosRepository.repo.delete as jest.Mock).mockResolvedValue({ affected: 0 })
      expect(todosService.deleteTodo(id))
        .rejects.toThrow(new NotFoundException(`Todo with ID: ${id} not found.`))
    })
  })
});
