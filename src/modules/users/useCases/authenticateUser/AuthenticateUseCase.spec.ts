import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { IncorrectEmailOrPasswordError } from './IncorrectEmailOrPasswordError';


let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let authenticateUserUseCase: AuthenticateUserUseCase;

describe("Unit tests for user authenticate", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able create a session for an existing account", async () => {
    const user = {
      name: "test-jest",
      email: "test-jest123@gmail.com",
      password: "test-jest123"
    };
    await createUserUseCase.execute(user);

    const userAuthenticated = await authenticateUserUseCase.execute({ email: user.email, password: user.password });

    expect(userAuthenticated.user).toHaveProperty('id');
    expect(userAuthenticated).toHaveProperty('token');
    expect(userAuthenticated.user.email).toEqual(user.email);
  });

  it("Should not be able create a session for a non-existent account", async () => {
    expect(async () => {
      const user = {
        name: "test-jest",
        email: "test-jest123@gmail.com",
        password: "test-jest123"
      };

      await authenticateUserUseCase.execute({ email: user.email, password: user.password });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError);


  });
});