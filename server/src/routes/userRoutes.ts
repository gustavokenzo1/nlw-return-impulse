import { Request, Response } from "express";

import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "../use-cases/create-user-use-case";
import { LoginUserUseCase } from "../use-cases/login-user-use-case";
import { ReadUsersUseCase } from "../use-cases/read-users-use-case";

const userRoutes = require("express").Router();

userRoutes.post("/", async (req: Request, res: Response) => {
  const { name, email, password, isAdmin } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  const createUserUseCase = new CreateUserUseCase(prismaUsersRepository);

  try {
    await createUserUseCase.execute({
      name,
      email,
      password,
      isAdmin,
      feedback: [],
    });

    return res.status(201).send();
  } catch (error) {
    return res.status(400).send(error);
  }
});

userRoutes.get("/", async (req: Request, res: Response) => {
  const prismaUsersRepository = new PrismaUsersRepository();
  const readUsersUseCase = new ReadUsersUseCase(prismaUsersRepository);

  try {
    const users = await readUsersUseCase.execute();

    return res.status(200).json(users);
  } catch (error) {
    throw error;
  }
});

userRoutes.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const prismaUsersRepository = new PrismaUsersRepository();
  const loginUserUseCase = new LoginUserUseCase(prismaUsersRepository);

  try {
    const user = await loginUserUseCase.execute({
      email,
      password,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default userRoutes;
