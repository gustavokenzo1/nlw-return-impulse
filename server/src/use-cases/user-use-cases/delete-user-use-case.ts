import { UsersRepository } from "../../repositories/users-repository";

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string) {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
