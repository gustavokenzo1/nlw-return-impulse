import { FeedbacksRepository } from "../../repositories/feedbacks-repository";

export class DeleteFeedbackUseCase {
  constructor(private feedbacksRepository: FeedbacksRepository) {}

  async execute(id: string) {
    if (!id) {
      throw new Error("Id is required");
    }

    try {
      await this.feedbacksRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
