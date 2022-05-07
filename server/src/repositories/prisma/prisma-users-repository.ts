import { prisma } from "../../prisma";
import { UserCreateData, UsersRepository } from "../users-repository";
import bcrypt from "bcryptjs";

export class PrismaUsersRepository implements UsersRepository {
  async create({ name, email, password, isAdmin }: UserCreateData) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          isAdmin,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      const users = await prisma.user.findMany();

      return users;
    } catch (error) {
      throw error;
    }
  }
}
