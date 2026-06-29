import { NextResponse } from "next/server";
import { validateQuizRequest } from "@/api/quiz";
import { generateGroqQuiz } from "@/services/groqQuiz";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = validateQuizRequest(body);

    if (!validation.ok) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const quiz = await generateGroqQuiz(validation.value);

    return NextResponse.json({ quiz });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unexpected quiz generation error.";
    const status = message.includes("GROQ_API_KEY") ? 500 : 502;

    return NextResponse.json({ error: message }, { status });
  }
}
