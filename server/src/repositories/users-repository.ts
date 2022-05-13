import { FeedbackCreateData } from "./feedbacks-repository";

export interface UserCreateData {
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
  feedback?: FeedbackCreateData[];
  apiKey?: string;
}

export interface UsersRepository {
  create: (data: UserCreateData) => Promise<void>;
  read: (data: UserCreateData) => Promise<object[]>;
  login: (email: string, password: string) => Promise<object>;
  update: (id: string, data: UserCreateData) => Promise<void>;
  delete: (id: string) => Promise<void>;
}
