import { UsersRepository } from "../../repositories/users-repository";

export class ReadUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute() {
    try {
      const users = await this.usersRepository.read();

      return users;
    } catch (error) {
      throw error;
    }
  }
}
