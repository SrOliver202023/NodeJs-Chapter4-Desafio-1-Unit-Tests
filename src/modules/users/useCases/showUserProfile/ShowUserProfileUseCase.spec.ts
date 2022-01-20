
import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';
import { ShowUserProfileError } from './ShowUserProfileError';

let usersRepositoryInMemory: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Unit tests for user profile", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepositoryInMemory);
  });

  it("Should be able show a user profile", async () => {
    const user = {
      name: "test-1",
      email: "test-1@gmail.com",
      password: "test-1"
    };

    const userCreated = await createUserUseCase.execute(user);
    const userProfile = await showUserProfileUseCase.execute(userCreated.id as string);

    expect(userProfile).toHaveProperty('id');
    expect(userProfile).toHaveProperty('email');
    expect(userProfile).toHaveProperty('name');
    expect(userProfile.name).toEqual(user.name);
    expect(userProfile.email).toEqual(user.email);
  });

  it("Should not be able show a user profile of a non-existent user", async () => {
    expect(async () => {
      const id_test = 'id-test-test-id-test';

      await showUserProfileUseCase.execute(id_test as string);

    }).rejects.toBeInstanceOf(ShowUserProfileError);

  });


});