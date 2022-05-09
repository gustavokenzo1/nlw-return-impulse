import { FeedbacksRepository } from "../repositories/feedbacks-repository";

export class DeleteFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(id: string) {
    try {
      await this.feedbacksRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
