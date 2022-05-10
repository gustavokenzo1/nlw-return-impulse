import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const dotenv = require("dotenv");
dotenv.config();

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body, user_email }: SendMailData) {
    await transport.sendMail({
      from: "Equipe FeedGet <feedget.impulse@gmail.com>",
      to: user_email ? [process.env.EMAIL!, user_email] : process.env.EMAIL,
      subject: subject,
      html: body,
    });
  }
}
