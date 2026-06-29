import {
  GeneratedQuiz,
  QUIZ_DIFFICULTIES,
  QUIZ_LANGUAGES,
  QUIZ_QUESTION_COUNTS,
  QuizDifficulty,
  QuizGenerationRequest,
  QuizLanguage,
  QuizQuestion,
  QuizQuestionCount,
} from "@/types/quiz";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeText(value: string): string {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

function parseAnswerIndex(value: unknown): number | null {
  if (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 0 &&
    value <= 3
  ) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    if (Number.isInteger(parsed) && parsed >= 0 && parsed <= 3) {
      return parsed;
    }
  }

  return null;
}

export function isQuizLanguage(value: unknown): value is QuizLanguage {
  return (
    typeof value === "string" && QUIZ_LANGUAGES.includes(value as QuizLanguage)
  );
}

export function isQuizDifficulty(value: unknown): value is QuizDifficulty {
  return (
    typeof value === "string" &&
    QUIZ_DIFFICULTIES.includes(value as QuizDifficulty)
  );
}

export function isQuizQuestionCount(
  value: unknown,
): value is QuizQuestionCount {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    QUIZ_QUESTION_COUNTS.includes(value as QuizQuestionCount)
  );
}

export function validateQuizRequest(
  value: unknown,
): { ok: true; value: QuizGenerationRequest } | { ok: false; error: string } {
  if (!isRecord(value)) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const {
    language,
    difficulty,
    numberOfQuestions,
    timerEnabled,
    shuffleQuestions,
  } = value;

  if (!isQuizLanguage(language)) {
    return { ok: false, error: "Invalid programming language selected." };
  }

  if (!isQuizDifficulty(difficulty)) {
    return { ok: false, error: "Invalid difficulty selected." };
  }

  if (!isQuizQuestionCount(numberOfQuestions)) {
    return { ok: false, error: "Invalid number of questions selected." };
  }

  return {
    ok: true,
    value: {
      language,
      difficulty,
      numberOfQuestions,
      timerEnabled: Boolean(timerEnabled),
      shuffleQuestions: Boolean(shuffleQuestions),
    },
  };
}

export function buildQuizPrompt({
  language,
  difficulty,
  numberOfQuestions,
}: Pick<
  QuizGenerationRequest,
  "language" | "difficulty" | "numberOfQuestions"
>) {
  return `Generate exactly ${numberOfQuestions} multiple choice programming questions about ${language}.

Difficulty:
${difficulty}

Rules:

- Return ONLY valid JSON.
- No markdown.
- No explanations.
JSON format:

{
"questions":[
{
"question":"...",
"options":[
"...",
"...",
"...",
"..."
],
"answer":1,
"explanation":"..."
}
]
}

The answer field should be the index (0-3).

Questions must be unique.

Avoid duplicates.

Make questions educational.`;
}

function normalizeQuizQuestion(value: unknown): QuizQuestion | null {
  if (!isRecord(value)) {
    return null;
  }

  const question =
    typeof value.question === "string" ? value.question.trim() : "";
  const explanation =
    typeof value.explanation === "string" ? value.explanation.trim() : "";
  const answer = parseAnswerIndex(value.answer);

  if (!question || !explanation || answer === null) {
    return null;
  }

  if (!Array.isArray(value.options) || value.options.length !== 4) {
    return null;
  }

  const options = value.options.map((option) =>
    typeof option === "string" ? option.trim() : "",
  );

  if (options.some((option) => option.length === 0)) {
    return null;
  }

  const hasDuplicateOptions =
    new Set(options.map(normalizeText)).size !== options.length;
  if (hasDuplicateOptions) {
    return null;
  }

  return {
    question,
    options: options as [string, string, string, string],
    answer,
    explanation,
  };
}

function extractJsonText(rawText: string): string | null {
  const trimmed = rawText.trim();

  if (!trimmed) {
    return null;
  }

  const fencedBlock = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const candidate = fencedBlock?.[1]?.trim() ?? trimmed;

  if (candidate.startsWith("{") && candidate.endsWith("}")) {
    return candidate;
  }

  const startIndex = candidate.indexOf("{");
  const endIndex = candidate.lastIndexOf("}");

  if (startIndex >= 0 && endIndex > startIndex) {
    return candidate.slice(startIndex, endIndex + 1);
  }

  return null;
}

export function parseQuizJson(rawText: string): unknown | null {
  const jsonText = extractJsonText(rawText);
  if (!jsonText) {
    return null;
  }

  try {
    return JSON.parse(jsonText);
  } catch {
    return null;
  }
}

export function normalizeQuizPayload(
  value: unknown,
  expectedQuestionCount: number,
): { ok: true; value: GeneratedQuiz } | { ok: false; error: string } {
  if (!isRecord(value)) {
    return {
      ok: false,
      error: "The generated quiz payload was not a JSON object.",
    };
  }

  if (!Array.isArray(value.questions)) {
    return {
      ok: false,
      error: "The generated quiz payload must include a questions array.",
    };
  }

  const normalizedQuestions: QuizQuestion[] = [];
  const seenQuestions = new Set<string>();

  for (const rawQuestion of value.questions) {
    const question = normalizeQuizQuestion(rawQuestion);
    if (!question) {
      continue;
    }

    const dedupeKey = normalizeText(question.question);
    if (seenQuestions.has(dedupeKey)) {
      continue;
    }

    seenQuestions.add(dedupeKey);
    normalizedQuestions.push(question);

    if (normalizedQuestions.length === expectedQuestionCount) {
      break;
    }
  }

  if (normalizedQuestions.length < expectedQuestionCount) {
    return {
      ok: false,
      error: `Groq returned only ${normalizedQuestions.length} valid questions. Expected ${expectedQuestionCount}.`,
    };
  }

  return {
    ok: true,
    value: {
      questions: normalizedQuestions,
    },
  };
}

export function calculateQuizResults(
  quiz: GeneratedQuiz,
  answers: Array<number | null>,
) {
  const reviews = quiz.questions.map((question, index) => {
    const selectedOptionIndex = answers[index];
    const isCorrect = selectedOptionIndex === question.answer;

    return {
      question: question.question,
      userAnswer:
        selectedOptionIndex === null
          ? null
          : (question.options[selectedOptionIndex] ?? null),
      correctAnswer: question.options[question.answer],
      explanation: question.explanation,
      isCorrect,
    };
  });

  const correctCount = reviews.filter((review) => review.isCorrect).length;
  const totalQuestions = quiz.questions.length;
  const wrongCount = totalQuestions - correctCount;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  return {
    score: correctCount,
    totalQuestions,
    percentage,
    correctCount,
    wrongCount,
    reviews,
  };
}

export function shuffleArray<T>(items: readonly T[]): T[] {
  const copy = [...items];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }

  return copy;
}
