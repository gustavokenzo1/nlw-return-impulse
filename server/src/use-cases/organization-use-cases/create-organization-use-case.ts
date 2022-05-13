import { MailAdapter } from "../../adapters/mail-adapter";
import { prisma } from "../../prisma";
import { OrganizationsRepository } from "../../repositories/organizations-repository";
import { UsersRepository } from "../../repositories/users-repository";
import bcrypt from "bcryptjs";

export interface CreateOrganizationUseCaseRequest {
  email: string;
}

export class CreateOrganizationUseCase {
  constructor(
    private organizationsRepository: OrganizationsRepository,
    private mailAdapter: MailAdapter,
    private usersRepository: UsersRepository
  ) {}

  async execute(request: CreateOrganizationUseCaseRequest) {
    const { email } = request;

    if (!email) {
      throw new Error("Email is required");
    }

    const apiKey = await this.organizationsRepository.create({ email });

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    
    function makeid(length: number) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    }

    const hashedPassword = makeid(10);
    if (!userExists) {
      await this.usersRepository.create({
        name: "Admin",
        email,
        isAdmin: true,
        password: hashedPassword,
      });
    } else {
      await this.usersRepository.update(userExists.id, { isAdmin: true });
    }

    await this.mailAdapter.sendMail({
      subject: "Boas-Vindas!",
      body: [
        `<body style="background-color: #8257e6; padding: 50px; border-radius: 10px; color: #ffffff">`,
        `<div style="text-align: center;">`,
        `<h1 style="font-size: 24px; font-weight: bold; margin-bottom: 50px;">A equipe FeedGet gostaria de dar boas-vindas a você!</h1>`,
        `<h1 style="font-size: 18px; margin-bottom: 50px;">Primeiramente, aqui está sua chave da API: ${apiKey}</h1>`,
        `<h1 style="font-size: 18px; margin-bottom: 50px;">`,
        userExists
          ? `Como detectamos que o e-mail já está associado a uma conta, essa mesma conta foi transformada em administrador, e poderá ser usada para administrar sua aplicação!`
          : `Como nenhum usuário foi encontrado com esse e-mail, nós criamos uma conta de administrador para você, com as seguintes credenciais: <br> e-mail: ${email} <br> e senha: ${hashedPassword}`,
        `</h1>`,
        `</div>`,
        `</body>`,
      ].join("\n"),
      user_email: email,
    });
  }
}
