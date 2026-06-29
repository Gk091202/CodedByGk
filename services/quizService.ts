import { normalizeQuizPayload } from "@/api/quiz";
import { GeneratedQuiz, QuizGenerationRequest } from "@/types/quiz";

export async function requestQuizGeneration(
  request: QuizGenerationRequest,
): Promise<GeneratedQuiz> {
  const response = await fetch("/api/quiz/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  let payload: unknown = null;

  try {
    payload = await response.json();
  } catch {
    throw new Error("The quiz generator returned an invalid server response.");
  }

  if (!response.ok) {
    const errorMessage =
      typeof payload === "object" &&
      payload !== null &&
      "error" in payload &&
      typeof (payload as { error?: unknown }).error === "string"
        ? (payload as { error: string }).error
        : "Failed to generate quiz. Please try again.";

    throw new Error(errorMessage);
  }

  const normalized = normalizeQuizPayload(
    typeof payload === "object" && payload !== null && "quiz" in payload
      ? (payload as { quiz?: unknown }).quiz
      : payload,
    request.numberOfQuestions,
  );

  if (!normalized.ok) {
    throw new Error(normalized.error);
  }

  return normalized.value;
}
