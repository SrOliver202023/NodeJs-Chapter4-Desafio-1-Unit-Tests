import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository';
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository';
import { CreateUserUseCase } from '../../../users/useCases/createUser/CreateUserUseCase';
import { CreateStatementUseCase } from './CreateStatementUseCase';

import { OperationType } from '../../entities/Statement';
import { ICreateStatementDTO } from './ICreateStatementDTO';

import { CreateStatementError } from './CreateStatementError';

let usersRepositoryInMemory: InMemoryUsersRepository;
let statementsRepositoryInMemory: InMemoryStatementsRepository;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

describe("Unit test for statement create", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    statementsRepositoryInMemory = new InMemoryStatementsRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    createStatementUseCase = new CreateStatementUseCase(usersRepositoryInMemory, statementsRepositoryInMemory);
  });

  it("Should be able create a deposit", async () => {
    const user = {
      name: "test-jest",
      email: "test-jest123@gmail.com",
      password: "test-jest123."
    };

    const userCreated = await createUserUseCase.execute(user);

    const deposit: ICreateStatementDTO = {
      user_id: userCreated.id as string,
      description: "test..." as string,
      amount: 100 as number,
      type: 'deposit' as OperationType
    };

    const operationDepositCreated = await createStatementUseCase.execute(deposit);
    expect(operationDepositCreated).toHaveProperty('id');
    expect(operationDepositCreated.user_id).toEqual(userCreated.id);
  });

  it("Should not be able create a deposit for a non-existing account", async () => {
    expect(async () => {
      const deposit: ICreateStatementDTO = {
        user_id: "fake_id-test-fake-id-false" as string,
        description: "test..." as string,
        amount: 100 as number,
        type: "deposit" as OperationType
      };

      await createStatementUseCase.execute(deposit);
    }).rejects.toBeInstanceOf(CreateStatementError.UserNotFound);
  });

  it("Should be able create a withdraw", async () => {
    const user = {
      name: "test-jest",
      email: "test-jest123@gmail.com",
      password: "test-jest123."
    };

    const userCreated = await createUserUseCase.execute(user);

    const deposit: ICreateStatementDTO = {
      user_id: userCreated.id as string,
      description: "test..." as string,
      amount: 100 as number,
      type: 'deposit' as OperationType
    };

    await createStatementUseCase.execute(deposit);

    const withdraw: ICreateStatementDTO = {
      user_id: userCreated.id as string,
      description: "test..." as string,
      amount: 100 as number,
      type: 'withdraw' as OperationType
    };

    const operationWithdrawCreated = await createStatementUseCase.execute(withdraw);

    expect(operationWithdrawCreated).toHaveProperty('id');
    expect(operationWithdrawCreated.amount).toEqual(withdraw.amount);
    expect(operationWithdrawCreated.amount).toEqual(deposit.amount);
  });

  it("Should not be able to create loot larger than the available amount", async () => {
    expect(async () => {
      const user = {
        name: "test-jest",
        email: "test-jest123@gmail.com",
        password: "test-jest123."
      };

      const userCreated = await createUserUseCase.execute(user);

      const deposit: ICreateStatementDTO = {
        user_id: userCreated.id as string,
        description: "test..." as string,
        amount: 100 as number,
        type: 'deposit' as OperationType
      };

      await createStatementUseCase.execute(deposit);

      const withdraw: ICreateStatementDTO = {
        user_id: userCreated.id as string,
        description: "test..." as string,
        amount: 101 as number,
        type: 'withdraw' as OperationType
      };

      await createStatementUseCase.execute(withdraw);
    }).rejects.toBeInstanceOf(CreateStatementError.InsufficientFunds);
  });
});