import { FeedbackCreateData } from "./feedbacks-repository";

export interface UserCreateData {
  name: string,
  email: string,
  password: string,
  isAdmin: boolean,
  feedback: FeedbackCreateData[],
}

export interface UsersRepository {
  create: (data: UserCreateData) => Promise<void>;
  read: () => Promise<object[]>;
}