import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { OperationType } from '../../entities/Statement';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { ICreateStatementDTO } from '../createStatement/ICreateStatementDTO';
import { GetBalanceUseCase } from './GetBalanceUseCase';
import { GetBalanceError } from './GetBalanceError';

let usersRepositoryInMemory: InMemoryUsersRepository;
let statementRepositoryInMemory: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;

describe("Unit tests for use balance", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementRepositoryInMemory = new InMemoryStatementsRepository();
    getBalanceUseCase = new GetBalanceUseCase(statementRepositoryInMemory, usersRepositoryInMemory);
  });
  it("Should be able show general balance", async () => {
    const user = {
      name: "test",
      email: "test-jest@gmail.com",
      password: "test-jest123"
    };
    const userCreated = await usersRepositoryInMemory.create(user);
    const deposit: ICreateStatementDTO = {
      user_id: userCreated.id as string,
      description: "test deposit..." as string,
      amount: 100 as number,
      type: 'deposit' as OperationType
    };
    const withdraw: ICreateStatementDTO = {
      user_id: userCreated.id as string,
      description: "test withdraw..." as string,
      amount: 73.83 as number,
      type: 'withdraw' as OperationType
    };

    await statementRepositoryInMemory.create(deposit);
    await statementRepositoryInMemory.create(withdraw);
    const receiveBalance = await getBalanceUseCase.execute({ user_id: userCreated.id as string });

    expect(receiveBalance).toHaveProperty('statement');
    expect(receiveBalance).toHaveProperty('balance');
  });


  it("Should be able show general balance", async () => {
    expect(async () => {

      await getBalanceUseCase.execute({ user_id: 'user-id-test-fake-false' as string });

    }).rejects.toBeInstanceOf(GetBalanceError);
  });
});