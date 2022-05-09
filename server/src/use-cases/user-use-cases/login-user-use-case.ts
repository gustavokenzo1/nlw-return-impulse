import { UserCreateData, UsersRepository } from "../../repositories/users-repository";

export class LoginUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: UserCreateData) {
    try {
      const user = await this.usersRepository.login(data.email, data.password);
      return user;
    } catch (error) {
      throw error;
    }
  }
}