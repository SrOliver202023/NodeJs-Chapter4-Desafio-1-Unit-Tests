import { AppError } from '../../../../shared/errors/AppError';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';


let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("Unit tests for user creation", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new InMemoryUsersRepository;
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able create a user", async () => {
    const newUser = {
      email: "test@gmail.com",
      name: "test",
      password: "test123"
    };

    const userCreated = await createUserUseCase.execute(newUser);
    expect(userCreated).toHaveProperty("id");
  });

  it("Should no be able create an existing user", async () => {
    expect(async () => {
      const newUser = {
        email: "test@gmail.com",
        name: "test",
        password: "test123"
      };

      await createUserUseCase.execute(newUser);
      await createUserUseCase.execute(newUser);
    }).rejects.toBeInstanceOf(AppError);
  });

});