import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { PrismaUsersRepository } from "./repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "./use-cases/create-user-use-case";
import { ReadFeedbackUseCase } from "./use-cases/read-feedback-use-case";
import { ReadUsersUseCase } from "./use-cases/read-users-use-case";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

export const routes = express.Router();

routes.post("/feedbacks/:id", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const user_id = req.params.id;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
    user: user_id,
  });

  return res.status(201).send();
});

routes.get("/feedbacks", async (req, res) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const readFeedbackUseCase = new ReadFeedbackUseCase(
    prismaFeedbacksRepository
  );

  try {
    const feedbacks = await readFeedbackUseCase.execute();

    return res.status(200).json(feedbacks);
  } catch (error) {
    throw error;
  }
});

routes.post("/users", async (req, res) => {
  const { name, email, password, isAdmin } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

  await createUserUseCase.execute({
    name,
    email,
    password,
    isAdmin,
    feedback: [],
  });

  return res.status(201).send();
});

routes.get("/users", async (req, res) => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const readUsersUseCase = new ReadUsersUseCase(prismaUsersRepository);

  try {
    const users = await readUsersUseCase.execute();

    return res.status(200).json(users);
  } catch (error) {
    throw error;
  }
});
