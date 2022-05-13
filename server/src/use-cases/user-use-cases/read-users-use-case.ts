import { UsersRepository } from "../../repositories/users-repository";

export class ReadUsersUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(apiKey: any) {
    try {
      const users = await this.usersRepository.read(apiKey);

      return users;
    } catch (error) {
      throw error;
    }
  }
}
