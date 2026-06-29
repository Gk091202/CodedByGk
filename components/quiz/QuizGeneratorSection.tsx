"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import QuizCard from "./QuizCard";
import QuizProgress from "./QuizProgress";
import QuizResultsCircle from "./QuizResultsCircle";
import QuizSkeleton from "./QuizSkeleton";
import QuizToast from "./QuizToast";
import { useQuizGenerator } from "@/hooks/useQuizGenerator";
import {
  QUIZ_DIFFICULTIES,
  QUIZ_LANGUAGES,
  QUIZ_QUESTION_COUNTS,
} from "@/types/quiz";

const GeneratedQuizDetails = dynamic(() => import("./GeneratedQuizDetails"), {
  loading: () => <QuizSkeleton />,
  ssr: false,
});

function formatTime(seconds: number | null) {
  if (seconds === null) {
    return null;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export default function QuizGeneratorSection() {
  const quiz = useQuizGenerator();
  const [shareStatus, setShareStatus] = useState<string | null>(null);

  const timerDisplay = useMemo(
    () => formatTime(quiz.timeRemaining),
    [quiz.timeRemaining],
  );

  useEffect(() => {
    if (quiz.timeRemaining === 0 && quiz.isQuizActive) {
      quiz.finishQuiz();
    }
  }, [quiz]);

  const handleCopyScore = async () => {
    if (!quiz.results) {
      return;
    }

    const text = `I scored ${quiz.results.score}/${quiz.results.totalQuestions} (${quiz.results.percentage}%) on the CodedByGK AI Quiz Generator.`;
    try {
      await navigator.clipboard.writeText(text);
      setShareStatus("Score copied to clipboard.");
    } catch {
      setShareStatus("Unable to copy score right now.");
    }
  };

  const handleShareScore = async () => {
    if (!quiz.results) {
      return;
    }

    const shareText = `I scored ${quiz.results.score}/${quiz.results.totalQuestions} (${quiz.results.percentage}%) on the CodedByGK AI Quiz Generator.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "CodedByGK AI Quiz Result",
          text: shareText,
          url: window.location.href,
        });
        setShareStatus("Score shared successfully.");
        return;
      } catch {
        // ignore share cancel
      }
    }

    try {
      await navigator.clipboard.writeText(
        `${shareText} ${window.location.href}`,
      );
      setShareStatus("Share link copied to clipboard.");
    } catch {
      setShareStatus("Unable to share score right now.");
    }
  };

  const selectedCount = quiz.selectedAnswers.filter(
    (answer) => answer !== null,
  ).length;

  return (
    <section className="px-6 py-16 max-w-5xl mx-auto">
      <QuizToast
        message={quiz.errorMessage ?? shareStatus}
        type={quiz.errorMessage ? "error" : "success"}
        onClose={() => {
          quiz.setErrorMessage(null);
          setShareStatus(null);
        }}
      />

      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-primary">
          AI Quiz Generator
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-balance">
          Test your programming skills with AI-generated quizzes tailored to
          your level.
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
        <QuizCard
          title="Generate your quiz"
          subtitle="Choose a language, difficulty, and question count."
          className="sticky top-24 self-start"
        >
          <div className="space-y-5">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Programming Language
              </span>
              <select
                value={quiz.formState.language}
                onChange={(event) =>
                  quiz.updateFormState(
                    "language",
                    event.target.value as (typeof QUIZ_LANGUAGES)[number],
                  )
                }
                className="w-full rounded-2xl border border-light-border bg-light-bg px-4 py-3 text-sm outline-none transition focus:border-accent-primary dark:border-dark-border dark:bg-dark-bg"
              >
                {QUIZ_LANGUAGES.map((language) => (
                  <option key={language} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Difficulty
              </span>
              <select
                value={quiz.formState.difficulty}
                onChange={(event) =>
                  quiz.updateFormState(
                    "difficulty",
                    event.target.value as (typeof QUIZ_DIFFICULTIES)[number],
                  )
                }
                className="w-full rounded-2xl border border-light-border bg-light-bg px-4 py-3 text-sm outline-none transition focus:border-accent-primary dark:border-dark-border dark:bg-dark-bg"
              >
                {QUIZ_DIFFICULTIES.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <span className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Number of Questions
              </span>
              <div className="grid grid-cols-3 gap-3">
                {QUIZ_QUESTION_COUNTS.map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() =>
                      quiz.updateFormState("numberOfQuestions", count)
                    }
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                      quiz.formState.numberOfQuestions === count
                        ? "border-accent-primary bg-accent-primary text-white shadow-lg shadow-accent-primary/20"
                        : "border-light-border bg-light-bg text-zinc-700 hover:border-accent-primary dark:border-dark-border dark:bg-dark-bg dark:text-zinc-300"
                    }`}
                    aria-pressed={quiz.formState.numberOfQuestions === count}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center justify-between gap-4 rounded-2xl border border-light-border bg-light-bg px-4 py-3 dark:border-dark-border dark:bg-dark-bg">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Timer
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={quiz.formState.timerEnabled}
                  onClick={() =>
                    quiz.updateFormState(
                      "timerEnabled",
                      !quiz.formState.timerEnabled,
                    )
                  }
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                    quiz.formState.timerEnabled
                      ? "bg-accent-primary"
                      : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                      quiz.formState.timerEnabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </label>

              <label className="flex items-center justify-between gap-4 rounded-2xl border border-light-border bg-light-bg px-4 py-3 dark:border-dark-border dark:bg-dark-bg">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Shuffle questions
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={quiz.formState.shuffleQuestions}
                  onClick={() =>
                    quiz.updateFormState(
                      "shuffleQuestions",
                      !quiz.formState.shuffleQuestions,
                    )
                  }
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
                    quiz.formState.shuffleQuestions
                      ? "bg-accent-primary"
                      : "bg-zinc-300 dark:bg-zinc-700"
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${
                      quiz.formState.shuffleQuestions
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </label>
            </div>

            <button
              type="button"
              onClick={quiz.generateQuiz}
              disabled={quiz.isGenerating}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary px-5 py-4 text-base font-semibold text-white shadow-lg shadow-accent-primary/20 transition-all hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {quiz.isGenerating ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Generating...
                </>
              ) : (
                "Generate AI Quiz"
              )}
            </button>
          </div>
        </QuizCard>

        <div className="space-y-6">
          {!quiz.quiz && !quiz.isGenerating && (
            <QuizCard
              title="How it works"
              subtitle="A single prompt generates a fresh quiz you can solve right away."
            >
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  "Pick a language and level.",
                  "Generate a unique quiz from Groq.",
                  "Review your answers and explanations.",
                ].map((step, index) => (
                  <div
                    key={step}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </QuizCard>
          )}

          {quiz.isGenerating && <QuizSkeleton />}

          {quiz.quiz && !quiz.results && quiz.currentQuestion && (
            <QuizCard
              title="Quiz in progress"
              subtitle="Answer one question at a time and finish when ready."
            >
              <div className="space-y-5">
                <QuizProgress
                  currentQuestionIndex={quiz.currentQuestionIndex}
                  totalQuestions={quiz.totalQuestions}
                />

                {quiz.formState.timerEnabled && timerDisplay ? (
                  <div className="flex items-center justify-between rounded-2xl border border-light-border bg-light-bg px-4 py-3 text-sm dark:border-dark-border dark:bg-dark-bg">
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      Timer
                    </span>
                    <span className="font-semibold text-accent-primary">
                      {timerDisplay}
                    </span>
                  </div>
                ) : null}

                <div className="rounded-3xl border border-light-border bg-light-bg p-5 dark:border-dark-border dark:bg-dark-bg">
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 text-balance">
                    {quiz.currentQuestion.question}
                  </h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {quiz.currentQuestion.options.map((option, optionIndex) => {
                    const isSelected =
                      quiz.selectedAnswers[quiz.currentQuestionIndex] ===
                      optionIndex;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          quiz.selectAnswer(
                            quiz.currentQuestionIndex,
                            optionIndex,
                          )
                        }
                        aria-pressed={isSelected}
                        className={`min-h-16 rounded-2xl border px-4 py-4 text-left text-sm font-medium transition-all ${
                          isSelected
                            ? "border-accent-primary bg-accent-primary text-white shadow-lg shadow-accent-primary/20"
                            : "border-light-border bg-white/60 text-zinc-700 hover:border-accent-primary hover:bg-white dark:border-dark-border dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
                        }`}
                      >
                        <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/10 text-xs font-semibold">
                          {String.fromCharCode(65 + optionIndex)}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="button"
                    onClick={quiz.goToPreviousQuestion}
                    disabled={quiz.currentQuestionIndex === 0}
                    className="rounded-2xl border border-light-border bg-light-card px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:border-accent-primary disabled:cursor-not-allowed disabled:opacity-40 dark:border-dark-border dark:bg-dark-bg dark:text-zinc-200"
                  >
                    Previous
                  </button>

                  <div className="flex gap-3">
                    {quiz.currentQuestionIndex < quiz.totalQuestions - 1 ? (
                      <button
                        type="button"
                        onClick={quiz.goToNextQuestion}
                        className="rounded-2xl bg-accent-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-primary/90"
                      >
                        Next
                      </button>
                    ) : null}

                    <button
                      type="button"
                      onClick={quiz.finishQuiz}
                      disabled={quiz.isSubmitting || selectedCount === 0}
                      className="rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {quiz.isSubmitting ? "Finishing..." : "Finish Quiz"}
                    </button>
                  </div>
                </div>
              </div>
            </QuizCard>
          )}

          {quiz.results && quiz.quiz ? (
            <div className="space-y-6">
              <QuizCard
                title="Results"
                subtitle="Review your performance and explanations."
              >
                <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-center">
                  <QuizResultsCircle percentage={quiz.results.percentage} />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        Correct answers
                      </p>
                      <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {quiz.results.correctCount}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                      <p className="text-sm text-red-700 dark:text-red-300">
                        Wrong answers
                      </p>
                      <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {quiz.results.wrongCount}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-light-border bg-light-bg p-4 dark:border-dark-border dark:bg-dark-bg">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Final Score
                      </p>
                      <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {quiz.results.score} / {quiz.results.totalQuestions}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-light-border bg-light-bg p-4 dark:border-dark-border dark:bg-dark-bg">
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Percentage
                      </p>
                      <p className="mt-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                        {quiz.results.percentage}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={handleCopyScore}
                    className="rounded-2xl border border-light-border bg-light-card px-4 py-3 text-sm font-semibold transition hover:border-accent-primary dark:border-dark-border dark:bg-dark-bg"
                  >
                    Copy Score
                  </button>
                  <button
                    type="button"
                    onClick={handleShareScore}
                    className="rounded-2xl border border-light-border bg-light-card px-4 py-3 text-sm font-semibold transition hover:border-accent-primary dark:border-dark-border dark:bg-dark-bg"
                  >
                    Share Score
                  </button>
                  <button
                    type="button"
                    onClick={quiz.resetQuiz}
                    className="rounded-2xl border border-light-border bg-light-card px-4 py-3 text-sm font-semibold transition hover:border-accent-primary dark:border-dark-border dark:bg-dark-bg"
                  >
                    Retake Quiz
                  </button>
                  <button
                    type="button"
                    onClick={quiz.generateNewQuiz}
                    className="rounded-2xl bg-gradient-to-r from-accent-primary to-accent-secondary px-4 py-3 text-sm font-semibold text-white"
                  >
                    Generate New Quiz
                  </button>
                </div>
              </QuizCard>

              <QuizCard
                title="Review Answers"
                subtitle="Correct answers appear in green and incorrect answers in red."
              >
                <div className="space-y-4">
                  {quiz.results.reviews.map((review, index) => (
                    <div
                      key={`${review.question}-${index}`}
                      className={`rounded-3xl border p-5 ${
                        review.isCorrect
                          ? "border-emerald-500/20 bg-emerald-500/10"
                          : "border-red-500/20 bg-red-500/10"
                      }`}
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                        Question {index + 1}
                      </p>
                      <h4 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                        {review.question}
                      </h4>
                      <div className="mt-4 grid gap-3 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                            User Answer
                          </p>
                          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">
                            {review.userAnswer ?? "No answer selected"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                            Correct Answer
                          </p>
                          <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-200">
                            {review.correctAnswer}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-300">
                        {review.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </QuizCard>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
