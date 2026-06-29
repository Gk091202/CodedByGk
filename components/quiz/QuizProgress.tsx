"use client";

interface QuizProgressProps {
  currentQuestionIndex: number;
  totalQuestions: number;
}

export default function QuizProgress({
  currentQuestionIndex,
  totalQuestions,
}: QuizProgressProps) {
  const progress =
    totalQuestions > 0
      ? ((currentQuestionIndex + 1) / totalQuestions) * 100
      : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <span>
          Question {Math.min(currentQuestionIndex + 1, totalQuestions)} of{" "}
          {totalQuestions}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-200/80 dark:bg-zinc-800/80">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
