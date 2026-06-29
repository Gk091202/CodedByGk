"use client";

import type { ReactNode } from "react";

interface QuizCardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export default function QuizCard({
  title,
  subtitle,
  children,
  className = "",
}: QuizCardProps) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/10 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-5 space-y-1">
          {title ? (
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </h3>
          ) : null}
          {subtitle ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {subtitle}
            </p>
          ) : null}
        </div>
      )}
      {children}
    </div>
  );
}
