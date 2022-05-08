import { UserCreateData, UsersRepository } from "../repositories/users-repository";

export class LoginUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: UserCreateData) {
    try {
      await this.usersRepository.login(data.email, data.password);
    } catch (error) {
      throw error;
    }
  }
}