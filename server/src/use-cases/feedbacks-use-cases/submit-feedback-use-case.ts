import { MailAdapter } from "../../adapters/mail-adapter";
import { FeedbacksRepository } from "../../repositories/feedbacks-repository";

export interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
  user: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot, user } = request;

    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format");
    }

    await this.feedbacksRepository.create({ type, comment, screenshot, user });

    await this.mailAdapter.sendMail({
      subject: "Feedback do usuário",
      body: [
        `<div style="width: 100%; font-family: sans-serif; font-size: 16px; color: #111" display: flex; flex-direction: column; text-align: center; justify-content: center; align-items: center>`,
        `<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #8257e6">Novo Feedback!</h1>`,
        `<p style="font-size: 16px; margin-bottom: 16px;">`,
        `<strong>Tipo:</strong> ${type}<br>`,
        `<strong>Comentário:</strong> ${comment}<br>`,
        screenshot ? `Para ver a imagem, abra o Painel de Administrador` : ``,
        `</div>`,
      ].join("\n"),
    });
  }
}
