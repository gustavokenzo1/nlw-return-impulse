export interface SendMailData {
  subject: string;
  body: string;
  user_email?: string;
}

export interface MailAdapter {
  sendMail: (data: SendMailData) => Promise<void>;
}