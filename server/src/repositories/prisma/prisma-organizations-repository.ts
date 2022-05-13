import bcrypt from "bcryptjs";
import { prisma } from "../../prisma";
import {
  OrganizationCreateData,
  OrganizationsRepository,
} from "../organizations-repository";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create({ email }: OrganizationCreateData) {
    function makeid(length: number) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    if (email) {
      const apiKey = makeid(30);

      const organizationExists = await prisma.organization.count({
        where: {
          apiKey,
        },
      });

      if (organizationExists === 0) {
        try {
          await prisma.organization.create({
            data: {
              apiKey,
            },
          });
          return apiKey;
        } catch (error) {
          throw error;
        }
      } else {
        throw new Error("Organization already exists");
      }
    } else {
      throw new Error("Email is required");
    }
  }
}
