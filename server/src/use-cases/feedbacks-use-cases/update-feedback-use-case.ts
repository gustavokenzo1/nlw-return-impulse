import { MailAdapter } from "../../adapters/mail-adapter";
import { prisma } from "../../prisma";
import { FeedbacksRepository } from "../../repositories/feedbacks-repository";

export class UpdateFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}

  async execute(id: string, data: any) {
    try {
      const feedback = await prisma.feedback.findFirst({
        where: {
          id,
        },
      });

      const user = await prisma.user.findFirst({
        where: {
          id: (feedback as any).userId,
        },
      });

      await this.mailAdapter.sendMail({
        subject: "Atualizações sobre o feedback",
        body: [
          `<body style="background-color: #8257e6; padding: 50px; border-radius: 10px; color: #ffffff">`,
          `<div style="text-align: center;">`,
          `<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 50px;">Olá ${user?.name}! Tudo bem?</h1>`,
          `<h2 style="font-size: 24px; font-weight: bold; margin-bottom: 50px;">Nossa equipe gostaria de te avisar que seu feedback foi lido e que já estamos tomando providências!</h2>`,
          `<h3 style="font-size: 24px; font-weight: bold; margin-bottom: 50px;">Para mais informações acerca do feedback recebido, consulte sua página!</h3>`,
          `</div>`,
          `</body>`,
        ].join("\n"),
        user_email: user ? user.email : undefined,
      });

      await this.feedbacksRepository.update(id, data);
    } catch (error) {
      throw error;
    }
  }
}
