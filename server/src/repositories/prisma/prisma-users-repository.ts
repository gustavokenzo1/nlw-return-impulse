import { prisma } from "../../prisma";
import { UserCreateData, UsersRepository } from "../users-repository";
import bcrypt from "bcryptjs";

export class PrismaUsersRepository implements UsersRepository {
  async create({ name, email, password, isAdmin, apiKey }: UserCreateData) {
    if (name && email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const userExists = await prisma.user.count({
        where: {
          email,
        },
      });

      const organizationExists = await prisma.organization.findFirst({
        where: {
          apiKey,
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
              organizationId: organizationExists ? organizationExists.id : null,
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

  async read({ apiKey }: UserCreateData) {
    const organizationExists = await prisma.organization.findFirst({
      where: {
        apiKey,
      },
    });

    try {
      const users = await prisma.user.findMany({
        where: {
          organizationId: organizationExists ? organizationExists.id : null,
        },
      });

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

  async update(id: string, data: UserCreateData) {
    try {
      await prisma.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string) {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
