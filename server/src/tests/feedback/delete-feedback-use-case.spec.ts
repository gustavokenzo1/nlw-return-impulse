import { DeleteFeedbackUseCase } from "../../use-cases/feedbacks-use-cases/delete-feedback-use-case";

const deleteFeedbackSpy = jest.fn();

const deleteFeedback = new DeleteFeedbackUseCase(
  // @ts-ignore (ignore other functions because this file only tests "delete" use case)
  { delete: deleteFeedbackSpy }
);

describe("Delete feedback", () => {
  it("should be able to delete feedback", async () => {
    await expect(
      deleteFeedback.execute("77498bd3-e174-4530-8dd0-4819e38efad7")
    ).resolves.not.toThrow();

    expect(deleteFeedbackSpy).toHaveBeenCalled();
  });

  it("should not be able to delete feedback without id", async () => {
    await expect(
      deleteFeedback.execute("")
    ).rejects.toThrow();
  });
});
