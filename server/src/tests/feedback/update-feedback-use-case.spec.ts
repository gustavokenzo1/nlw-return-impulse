import { UpdateFeedbackUseCase } from "../../use-cases/feedbacks-use-cases/update-feedback-use-case";

const updateFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const updateFeedback = new UpdateFeedbackUseCase(
  // @ts-ignore (ignore other functions because this file only tests "update" use case)
  { update: updateFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Update feedback", () => {
  it("should be able to update feedback", async () => {
    await expect(
      updateFeedback.execute("a30a0d12-9410-40a5-b6aa-39a1a893b3d6", {
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,ad165f46adaf",
        user: "77498bd3-e174-4530-8dd0-4819e38efad7",
      })
    ).resolves.not.toThrow();
  });

  it("should not be able to update feedback with invalid id", async () => {
    await expect(
      updateFeedback.execute("", {
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,ad165f46adaf",
        user: "77498bd3-e174-4530-8dd0-4819e38efad7",
      })
    ).rejects.toThrow();
  });

  it("should not be able to update feedback without data", async () => {
    await expect(
      updateFeedback.execute("a30a0d12-9410-40a5-b6aa-39a1a893b3d6", "")
    ).rejects.toThrow();
  });
});
