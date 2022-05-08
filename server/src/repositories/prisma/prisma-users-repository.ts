import { prisma } from "../../prisma";
import { UserCreateData, UsersRepository } from "../users-repository";
import bcrypt from "bcryptjs";

export class PrismaUsersRepository implements UsersRepository {
  async create({ name, email, password, isAdmin }: UserCreateData) {
    if (name && email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const userExists = await prisma.user.count({
        where: {
          email,
        },
      });

      if (userExists === 0) {
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
      } else {
        throw new Error("User already exists");
      }
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

  async login(email: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return user;
      } else {
        throw new Error("Invalid password");
      }
    } else {
      throw new Error("User not found");
    }
  }
}
