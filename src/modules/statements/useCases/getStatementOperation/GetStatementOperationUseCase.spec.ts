import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { GetStatementOperationUseCase } from './GetStatementOperationUseCase';
import { ICreateStatementDTO } from '../createStatement/ICreateStatementDTO';
import { OperationType } from '../../entities/Statement';
import { GetStatementOperationError } from './GetStatementOperationError';

let usersRepositoryInMemory: InMemoryUsersRepository;
let statementsRepositoryInMemory: InMemoryStatementsRepository;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe("Unit test for statement operations", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    getStatementOperationUseCase = new GetStatementOperationUseCase(usersRepositoryInMemory, statementsRepositoryInMemory);
  });
  it("Should be able show a stament operation by id", async () => {
    const user = {
      name: "test",
      email: "test-jest@gmail.com",
      password: "test-jest123"
    };
    const userCreated = await usersRepositoryInMemory.create(user);
    const deposit: ICreateStatementDTO = {
      user_id: userCreated.id as string,
      description: "test..." as string,
      amount: 100 as number,
      type: 'deposit' as OperationType
    };
    const statementDepositOperation = await statementsRepositoryInMemory.create(deposit);
    const receiveOperationSearch = await getStatementOperationUseCase.execute({
      user_id: userCreated.id as string,
      statement_id: statementDepositOperation.id as string
    });
    expect(receiveOperationSearch).toHaveProperty('id');
    expect(receiveOperationSearch).toHaveProperty('user_id');
  });

  it("Should not be able show a stament operation of an user non-existent", async () => {
    expect(async () => {
      const user = {
        name: "test",
        email: "test-jest@gmail.com",
        password: "test-jest123"
      };
      const deposit: ICreateStatementDTO = {
        user_id: 'id-false-fake-test' as string,
        description: "test..." as string,
        amount: 100 as number,
        type: 'deposit' as OperationType
      };
      const receiveOperationSearch = await getStatementOperationUseCase.execute({
        user_id: 'id-false-fake-test' as string,
        statement_id: 'id-false-fake-test' as string
      });
    }).rejects.toBeInstanceOf(GetStatementOperationError.UserNotFound);
  });
  it("Should not be able show a stament operation of an stament operation non-existent", async () => {
    expect(async () => {
      const user = {
        name: "test",
        email: "test-jest@gmail.com",
        password: "test-jest123"
      };
      const userCreated = await usersRepositoryInMemory.create(user);
      const deposit: ICreateStatementDTO = {
        user_id: userCreated.id as string,
        description: "test..." as string,
        amount: 100 as number,
        type: 'deposit' as OperationType
      };
      const receiveOperationSearch = await getStatementOperationUseCase.execute({
        statement_id: 'id-false-fake-test' as string,
        user_id: userCreated.id as string
      });
    }).rejects.toBeInstanceOf(GetStatementOperationError.StatementNotFound);
  });
});