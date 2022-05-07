import { UserCreateData } from "./users-repository";

export interface FeedbackCreateData {
  type: string,
  comment: string,
  screenshot?: string,
  user: string
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
  read: () => Promise<object[]>;
}