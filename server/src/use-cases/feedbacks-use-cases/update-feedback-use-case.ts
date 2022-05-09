import { FeedbacksRepository } from "../../repositories/feedbacks-repository";

export class UpdateFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(id: string, data: object) {
    try {
      await this.feedbacksRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
}
