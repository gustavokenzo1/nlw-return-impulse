import { UserCreateData, UsersRepository } from "../../repositories/users-repository";

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string, data: UserCreateData) {
    try {
      await this.usersRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
}
