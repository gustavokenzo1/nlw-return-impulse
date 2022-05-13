import { Request, Response } from "express";

import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { prisma } from "../prisma";
import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repository";
import { DeleteFeedbackUseCase } from "../use-cases/feedbacks-use-cases/delete-feedback-use-case";
import { ReadAllFeedbacksUseCase } from "../use-cases/feedbacks-use-cases/read-all-feedbacks-use-case";
import { ReadFeedbackUseCase } from "../use-cases/feedbacks-use-cases/read-feedback-use-case";
import { SubmitFeedbackUseCase } from "../use-cases/feedbacks-use-cases/submit-feedback-use-case";
import { UpdateFeedbackUseCase } from "../use-cases/feedbacks-use-cases/update-feedback-use-case";

const feedbackRoutes = require("express").Router();
const prismaFeedbacksRepository = new PrismaFeedbacksRepository();

feedbackRoutes.post("/", async (req: Request, res: Response) => {
  const { type, comment, screenshot, user, apiKey } = req.body;

  if (!type || !comment || !apiKey) {
    return res.status(400).send("Missing required fields");
  }

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
    apiKey,
  });

  return res.status(201).send();
});

feedbackRoutes.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).send("Missing required fields");
  }

  const readFeedbackUseCase = new ReadFeedbackUseCase(
    prismaFeedbacksRepository
  );

  try {
    const feedbacks = await readFeedbackUseCase.execute(userId);

    return res.status(200).json(feedbacks);
  } catch (error) {
    return res.status(400).send(error);
  }
});

feedbackRoutes.patch("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const data = req.body;

  if (!id || !data) {
    return res.status(400).send("Missing required fields");
  }

  const nodemailerMailAdapter = new NodemailerMailAdapter();

  const updateFeedbackUseCase = new UpdateFeedbackUseCase(
    prismaFeedbacksRepository,
    nodemailerMailAdapter
  );

  try {
    await updateFeedbackUseCase.execute(id, data);

    return res.status(200).send();
  } catch (error) {
    return res.status(400).send(error);
  }
});

feedbackRoutes.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send("Missing required fields");
  }

  const deleteFeedbackUseCase = new DeleteFeedbackUseCase(
    prismaFeedbacksRepository
  );

  try {
    await deleteFeedbackUseCase.execute(id);

    return res.status(200).send();
  } catch (error) {
    return res.status(400).send(error);
  }
});

feedbackRoutes.get("/", async (req: Request, res: Response) => {
  const readAllFeedbackUseCase = new ReadAllFeedbacksUseCase(
    prismaFeedbacksRepository
  );

  const userId = req.headers.userid;
  const { apiKey } = req.body;

  if (!userId || !apiKey) {
    return res.status(400).send("Missing required fields");
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (user!.isAdmin) {
    try {
      const feedbacks = await readAllFeedbackUseCase.execute(apiKey);

      return res.status(200).json(feedbacks);
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    return res.status(401).send();
  }
});

export default feedbackRoutes;
