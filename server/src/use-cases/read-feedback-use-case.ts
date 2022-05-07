import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export class ReadFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute() {
    try {
      const feedbacks = await this.feedbacksRepository.read();

      return feedbacks;
    } catch (error) {
      throw error;
    }
  }
}
