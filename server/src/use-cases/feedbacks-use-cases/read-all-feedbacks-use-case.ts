import { FeedbacksRepository } from "../../repositories/feedbacks-repository";

export class ReadAllFeedbacksUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute() {
    try {
      const feedbacks = await this.feedbacksRepository.readAll();

      return feedbacks;
    } catch (error) {
      throw error;
    }
  }
}
