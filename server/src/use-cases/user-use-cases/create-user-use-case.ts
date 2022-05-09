import {
  UserCreateData,
  UsersRepository,
} from "../../repositories/users-repository";

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: UserCreateData) {
    try {
      await this.usersRepository.create(data);
    } catch (error) {
      throw error;
    }
  }
}
