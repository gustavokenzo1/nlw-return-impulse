import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "8d365613b7368c",
    pass: "b69147006320c0",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: "Equipe FeedGet <feedbacks@feedget.com>",
      to: "Gustavo Kenzo <gustavokenzo314@gmail.com>",
      subject: subject,
      html: body,
    });
  }
}
