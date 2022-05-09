import { Request, Response } from "express";

import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { prisma } from "../prisma";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repository";
import { DeleteFeedbackUseCase } from "../use-cases/delete-feedback-use-case";
import { ReadAllFeedbacksUseCase } from "../use-cases/read-all-feedbacks-use-case";
import { ReadFeedbackUseCase } from "../use-cases/read-feedback-use-case";
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback-use-case";
import { UpdateFeedbackUseCase } from "../use-cases/update-feedback-use-case";

const feedbackRoutes = require("express").Router();

feedbackRoutes.post("/", async (req: Request, res: Response) => {
  const { type, comment, screenshot, user } = req.body;

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
    user,
  });

  return res.status(201).send();
});

feedbackRoutes.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const readFeedbackUseCase = new ReadFeedbackUseCase(
    prismaFeedbacksRepository
  );

  try {
    const feedbacks = await readFeedbackUseCase.execute(userId);

    return res.status(200).json(feedbacks);
  } catch (error) {
    throw error;
  }
});

feedbackRoutes.patch("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const updateFeedbackUseCase = new UpdateFeedbackUseCase(
    prismaFeedbacksRepository
  );

  try {
    await updateFeedbackUseCase.execute(id, data);

    return res.status(200).send();
  } catch (error) {
    throw error;
  }
});

feedbackRoutes.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const deleteFeedbackUseCase = new DeleteFeedbackUseCase(
    prismaFeedbacksRepository
  );

  try {
    await deleteFeedbackUseCase.execute(id);

    return res.status(200).send();
  } catch (error) {
    throw error;
  }
});

feedbackRoutes.get("/", async (req: Request, res: Response) => {
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

  const readAllFeedbackUseCase = new ReadAllFeedbacksUseCase(
    prismaFeedbacksRepository
  );

  const userId = req.body.userId;

  const user = await prisma.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (user!.isAdmin) {
    try {
      const feedbacks = await readAllFeedbackUseCase.execute();

      return res.status(200).json(feedbacks);
    } catch (error) {
      throw error;
    }
  } else {
    return res.status(401).send();
  }
});

export default feedbackRoutes;
