import { FeedbacksRepository } from "../../repositories/feedbacks-repository";

export class ReadAllFeedbacksUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(apiKey: string) {
    try {
      const feedbacks = await this.feedbacksRepository.readAll(apiKey);

      return feedbacks;
    } catch (error) {
      throw error;
    }
  }
}
