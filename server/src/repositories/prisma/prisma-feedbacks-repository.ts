import { prisma } from "../../prisma";
import {
  FeedbackCreateData,
  FeedbacksRepository,
} from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository {
  async create({ type, comment, screenshot, user }: FeedbackCreateData) {
    try {
      await prisma.feedback.create({
        data: {
          type,
          comment,
          screenshot,
          userId: user,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async read() {
    try {
      const feedbacks = await prisma.feedback.findMany();

      return feedbacks;
    } catch (error) {
      throw error;
    }
  }
}
