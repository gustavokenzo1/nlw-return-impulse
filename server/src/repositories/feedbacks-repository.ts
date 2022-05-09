import { UserCreateData } from "./users-repository";

export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
  user: string;
}

export interface FeedbacksRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
  read: (userId: string) => Promise<object[]>;
  update: (id: string, data: object) => Promise<void>;
  delete: (id: string) => Promise<void>;
  readAll: () => Promise<object[]>;
}
