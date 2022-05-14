import { MailAdapter } from "../../adapters/mail-adapter";
import { prisma } from "../../prisma";
import { FeedbacksRepository } from "../../repositories/feedbacks-repository";

export interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
  user: string;
  apiKey: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot, user, apiKey } = request;

    if (!type) {
      throw new Error("Type is required");
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
      throw new Error("Invalid screenshot format");
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
      user,
      apiKey,
    });
    let userInfo;

    if (user) {
      userInfo = await prisma.user.findFirst({
        where: {
          id: user,
        },
      });
    }

    await this.mailAdapter.sendMail({
      subject: "Feedback do usuário",
      body: [
        `<body style="background-color: #8257e6; padding: 50px; border-radius: 10px; color: #ffffff">`,
        `<div style="text-align: center;">`,
        `<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 50px;">Novo Feedback Recebido!</h1>`,
        `<h2><strong>Tipo:</strong> ${type}</h2>`,
        `<h2><strong>Comentário:</strong> ${comment}</h2>`,
        screenshot && `<h2>Visite o site para ver a foto</h2>`,
        userInfo &&
          userInfo.name !== "Admin" ?
          `<h3>Olá ${userInfo.name}, obrigado pelo feedback! Você receberá um e-mail quando nossa equipe ler o seu feedback! Você também pode acompanhar o status do mesmo pelo seu painel no site!</h3>`
          : ``,
        `</div>`,
        `</body>`,
      ].join("\n"),
      user_email: userInfo ? userInfo.email : undefined,
    });
  }
}
