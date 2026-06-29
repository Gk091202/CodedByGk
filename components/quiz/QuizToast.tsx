"use client";

import { useEffect } from "react";

interface QuizToastProps {
  message: string | null;
  type?: "error" | "success" | "info";
  onClose: () => void;
}

export default function QuizToast({
  message,
  type = "error",
  onClose,
}: QuizToastProps) {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timeout = window.setTimeout(onClose, 4200);
    return () => window.clearTimeout(timeout);
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  const colors = {
    error: "border-red-500/20 bg-red-500/10 text-red-100",
    success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-100",
    info: "border-sky-500/20 bg-sky-500/10 text-sky-100",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div
        className={`rounded-2xl border px-4 py-3 shadow-2xl backdrop-blur-xl ${colors[type]}`}
      >
        <div className="flex items-start gap-3">
          <p className="flex-1 text-sm leading-6">{message}</p>
          <button
            type="button"
            onClick={onClose}
            className="text-sm font-medium opacity-80 transition-opacity hover:opacity-100"
            aria-label="Close notification"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
