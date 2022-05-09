import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { PrismaUsersRepository } from "../repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "../use-cases/user-use-cases/create-user-use-case";
import { LoginUserUseCase } from "../use-cases/user-use-cases/login-user-use-case";
import { ReadUsersUseCase } from "../use-cases/user-use-cases/read-users-use-case";
import { UpdateUserUseCase } from "../use-cases/user-use-cases/update-user-use-case";
import { DeleteUserUseCase } from "../use-cases/user-use-cases/delete-user-use-case";
import { prisma } from "../prisma";

const userRoutes = require("express").Router();

userRoutes.post("/", async (req: Request, res: Response) => {
  const { name, email, password, isAdmin } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Missing required fields");
  }

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

  const userId = req.headers.userid;

  const user = await prisma.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (user!.isAdmin) {
    try {
      const users = await readUsersUseCase.execute();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
});

userRoutes.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

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

userRoutes.patch("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email, password, isAdmin } = req.body;

  if (!id) {
    return res.status(400).send("Missing required fields");
  }

  const prismaUsersRepository = new PrismaUsersRepository();
  const updateUserUseCase = new UpdateUserUseCase(prismaUsersRepository);

  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
  }

  const userId = req.headers.userid;

  const user = await prisma.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (user!.isAdmin) {
    try {
      await updateUserUseCase.execute(id, {
        name,
        email,
        password,
        isAdmin,
      });

      return res.status(200).send();
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    return res
      .status(400)
      .send("You are not authorized to perform this action");
  }
});

userRoutes.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).send("Missing required fields");
  }

  const prismaUsersRepository = new PrismaUsersRepository();
  const deleteUserUseCase = new DeleteUserUseCase(prismaUsersRepository);

  const userId = req.headers.userid;

  const user = await prisma.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (user!.isAdmin) {
    try {
      await deleteUserUseCase.execute(id);

      return res.status(200).send();
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    return res
      .status(400)
      .send("You are not authorized to perform this action");
  }
});

export default userRoutes;
