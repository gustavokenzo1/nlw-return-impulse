import { FeedbacksRepository } from "../../repositories/feedbacks-repository";

export class ReadFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(userId: string) {
    try {
      const feedbacks = await this.feedbacksRepository.read(userId);

      return feedbacks;
    } catch (error) {
      throw error;
    }
  }
}
