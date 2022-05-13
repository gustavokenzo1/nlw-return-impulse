import bcrypt from "bcryptjs";
import { prisma } from "../../prisma";
import {
  OrganizationCreateData,
  OrganizationsRepository,
} from "../organizations-repository";

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create({ email }: OrganizationCreateData) {
    if (email) {
      const apiKey = bcrypt.hashSync(email, 15);

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
