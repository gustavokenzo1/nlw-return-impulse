import { SubmitFeedbackUseCase } from "../../use-cases/feedbacks-use-cases/submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  // @ts-ignore (ignore other functions because this file only tests "create" use case)
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,ad165f46adaf",
        user: "77498bd3-e174-4530-8dd0-4819e38efad7",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedback.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,ad165f46adaf",
        user: "77498bd3-e174-4530-8dd0-4819e38efad7",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,ad165f46adaf",
        user: "77498bd3-e174-4530-8dd0-4819e38efad7",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback with an invalid screenshot", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "test.png",
        user: "77498bd3-e174-4530-8dd0-4819e38efad7",
      })
    ).rejects.toThrow();
  });
});
