import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';

const mockTodosRepository = () => {
  getTodoList: jest.fn()
}

describe('TodosService', () => {
  let todosService: TodosService
  let todosRepository: TodosRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      
    })
  })
});
