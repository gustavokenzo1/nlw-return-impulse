import { prisma } from "../../prisma";
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({
    type,
    comment,
    screenshot,
    user,
    apiKey,
  }: FeedbackCreateData) {
    try {
      const organizationExists = await prisma.organization.findFirst({
        where: {
          apiKey,
        },
      });

      if (!organizationExists) {
        throw new Error("Organization does not exist");
      }

      await prisma.feedback.create({
        data: {
          type,
          comment,
          screenshot,
          userId: user,
          organizationId: organizationExists ? organizationExists.id : null,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async read(userId: string) {
    try {
      const feedbacks = await prisma.feedback.findMany({
        where: {
          userId,
        },
      });

      return feedbacks;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, data: object) {
    try {
      (data as any).user_id = undefined;

      await prisma.feedback.update({
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
      await prisma.feedback.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async readAll(apiKey: string) {
    try {
      const organizationExists = await prisma.organization.findFirst({
        where: {
          apiKey,
        },
      });

      const feedbacks = await prisma.feedback.findMany({
        where: {
          organizationId: organizationExists ? organizationExists.id : null,
        },
      });
      return feedbacks;
    } catch (error) {
      throw error;
    }
  }
}
