"use client";

interface QuizResultsCircleProps {
  percentage: number;
}

export default function QuizResultsCircle({
  percentage,
}: QuizResultsCircleProps) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg
        width="160"
        height="160"
        viewBox="0 0 160 160"
        className="-rotate-90"
      >
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="currentColor"
          strokeWidth="12"
          className="text-zinc-200 dark:text-zinc-800"
          fill="none"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          stroke="url(#quizGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700"
        />
        <defs>
          <linearGradient
            id="quizGradient"
            x1="0"
            y1="0"
            x2="160"
            y2="160"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#38BDF8" />
            <stop offset="1" stopColor="#22C55E" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          {percentage}%
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Score
        </div>
      </div>
    </div>
  );
}
