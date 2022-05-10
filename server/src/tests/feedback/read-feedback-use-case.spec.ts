import { ReadFeedbackUseCase } from "../../use-cases/feedbacks-use-cases/read-feedback-use-case";

const readFeedbackSpy = jest.fn();

const readFeedback = new ReadFeedbackUseCase(
  // @ts-ignore (ignore other functions because this file only tests "read" use case)
  { read: readFeedbackSpy }
);

describe("Read feedback", () => {
  it("should be able to read a feedback", async () => {
    await expect(
      readFeedback.execute("77498bd3-e174-4530-8dd0-4819e38efad7")
    ).resolves.not.toThrow();

    expect(readFeedbackSpy).toHaveBeenCalled();
  });

  it("should not be able to read a feedback without a user id", async () => {
    await expect(readFeedback.execute("")).rejects.toThrow();
  });
});
