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
  async sendMail({ subject, body, user_email, adminsEmails }: SendMailData) {
    const emails = [];
    if (user_email) {
      emails.push(user_email);
    }
    if (adminsEmails) {
      emails.push(...adminsEmails);
    }
    emails.push(process.env.EMAIL);

    const uniqueEmails = [...new Set(emails)].join(",");

    await transport.sendMail({
      from: "Equipe FeedGet <feedget.impulse@gmail.com>",
      to: uniqueEmails,
      subject: subject,
      html: body,
    });
  }
}
