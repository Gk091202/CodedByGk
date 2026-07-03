import {
  buildQuizPrompt,
  normalizeQuizPayload,
  parseQuizJson,
} from "@/api/quiz";
import { GeneratedQuiz, QuizGenerationRequest } from "@/types/quiz";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_CODER_MODELS = [
  "qwen/qwen3-coder-480b-a35b-instruct",
  "qwen/qwen2.5-coder-32b-instruct",
  "llama-3.3-70b-versatile",
] as const;

function getErrorMessage(bodyText: string): string {
  try {
    const parsed = JSON.parse(bodyText) as {
      error?: { message?: string } | string;
      message?: string;
    };

    if (typeof parsed.error === "string") {
      return parsed.error;
    }

    if (
      parsed.error &&
      typeof parsed.error === "object" &&
      typeof parsed.error.message === "string"
    ) {
      return parsed.error.message;
    }

    if (typeof parsed.message === "string") {
      return parsed.message;
    }
  } catch {
    // ignore parsing failures and fall back to raw body text
  }

  return bodyText || "Groq request failed.";
}

function shouldTryNextModel(status: number): boolean {
  return status === 404 || status === 422;
}

export async function generateGroqQuiz(
  request: QuizGenerationRequest,
): Promise<GeneratedQuiz> {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured on the server.");
  }

  const prompt = buildQuizPrompt(request);
  let lastError = "";

  for (const model of GROQ_CODER_MODELS) {
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        temperature: 0.7,
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content:
              "You are a programming quiz generator that returns only strict JSON without markdown or extra commentary.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    });

    const bodyText = await response.text();

    if (!response.ok) {
      lastError = getErrorMessage(bodyText);

      if (
        shouldTryNextModel(response.status) &&
        model !== GROQ_CODER_MODELS[GROQ_CODER_MODELS.length - 1]
      ) {
        continue;
      }

      throw new Error(lastError);
    }

    const parsedBody = JSON.parse(bodyText) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = parsedBody.choices?.[0]?.message?.content;

    if (typeof content !== "string") {
      lastError = "Groq response did not contain quiz content.";
      continue;
    }

    const parsedQuiz = parseQuizJson(content);
    if (!parsedQuiz) {
      lastError = "Groq returned malformed JSON.";
      console.error(`[Quiz] Malformed JSON from ${model}: ${content.slice(0, 200)}`);
      continue;
    }

    console.log(`[Quiz] Parsed quiz from ${model}: ${JSON.stringify(parsedQuiz).slice(0, 300)}`);

    const normalizedQuiz = normalizeQuizPayload(
      parsedQuiz,
      request.numberOfQuestions,
    );
    if (!normalizedQuiz.ok) {
      lastError = normalizedQuiz.error;
      console.error(`[Quiz] Validation failed: ${normalizedQuiz.error}`);
      continue;
    }

    console.log(`[Quiz] Successfully generated ${normalizedQuiz.value.questions.length} valid questions from ${model}`);
    return normalizedQuiz.value;
  }

  throw new Error(lastError || "Unable to generate a quiz right now.");
}
