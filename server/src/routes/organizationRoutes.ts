import { Request, Response } from "express";

import { NodemailerMailAdapter } from "../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaOrganizationsRepository } from "../repositories/prisma/prisma-organizations-repository";
import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { CreateOrganizationUseCase } from "../use-cases/organization-use-cases/create-organization-use-case";

const organizationRoutes = require("express").Router();
const prismaOrganizationsRepository = new PrismaOrganizationsRepository();
const prismaUsersRepository = new PrismaUsersRepository();

organizationRoutes.post("/", async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const nodemailerMailAdapter = new NodemailerMailAdapter();
    const createOrganizationUseCase = new CreateOrganizationUseCase(
      prismaOrganizationsRepository,
      nodemailerMailAdapter,
      prismaUsersRepository
    );

    await createOrganizationUseCase.execute({
      email,
    });

    return res.status(201).send();
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default organizationRoutes;
