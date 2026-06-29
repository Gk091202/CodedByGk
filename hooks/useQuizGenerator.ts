"use client";

import { useCallback, useMemo, useState } from "react";
import {
  GeneratedQuiz,
  QuizDifficulty,
  QuizFormState,
  QuizQuestion,
  QuizQuestionCount,
  QuizResults,
} from "@/types/quiz";
import { requestQuizGeneration } from "@/services/quizService";
import { shuffleArray } from "@/api/quiz";

const DEFAULT_FORM_STATE: QuizFormState = {
  language: "JavaScript",
  difficulty: "Beginner",
  numberOfQuestions: 10,
  timerEnabled: false,
  shuffleQuestions: true,
};

function buildInitialAnswers(totalQuestions: number): Array<number | null> {
  return Array.from({ length: totalQuestions }, () => null);
}

export function useQuizGenerator() {
  const [formState, setFormState] = useState<QuizFormState>(DEFAULT_FORM_STATE);
  const [quiz, setQuiz] = useState<GeneratedQuiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Array<number | null>>(
    [],
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [results, setResults] = useState<QuizResults | null>(null);
  const [quizStartedAt, setQuizStartedAt] = useState<number | null>(null);

  const totalQuestions = quiz?.questions.length ?? 0;
  const isQuizActive = Boolean(quiz && !results);

  const currentQuestion: QuizQuestion | null = useMemo(() => {
    if (!quiz) {
      return null;
    }

    return quiz.questions[currentQuestionIndex] ?? null;
  }, [currentQuestionIndex, quiz]);

  const timeRemaining = useMemo(() => {
    if (!formState.timerEnabled || !quizStartedAt || !totalQuestions) {
      return null;
    }

    const totalSeconds = totalQuestions * 60;
    const elapsedSeconds = Math.floor((Date.now() - quizStartedAt) / 1000);
    return Math.max(totalSeconds - elapsedSeconds, 0);
  }, [formState.timerEnabled, quizStartedAt, totalQuestions]);

  const generateQuiz = useCallback(async () => {
    setIsGenerating(true);
    setErrorMessage(null);
    setResults(null);

    try {
      const generatedQuiz = await requestQuizGeneration(formState);
      const finalQuestions = formState.shuffleQuestions
        ? shuffleArray(generatedQuiz.questions)
        : generatedQuiz.questions;

      const normalizedQuiz = { questions: finalQuestions };

      setQuiz(normalizedQuiz);
      setSelectedAnswers(buildInitialAnswers(finalQuestions.length));
      setCurrentQuestionIndex(0);
      setQuizStartedAt(Date.now());
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to generate quiz.",
      );
    } finally {
      setIsGenerating(false);
    }
  }, [formState]);

  const selectAnswer = useCallback(
    (questionIndex: number, answerIndex: number) => {
      setSelectedAnswers((currentAnswers) => {
        const nextAnswers = [...currentAnswers];
        nextAnswers[questionIndex] = answerIndex;
        return nextAnswers;
      });
    },
    [],
  );

  const goToNextQuestion = useCallback(() => {
    setCurrentQuestionIndex((currentIndex) =>
      Math.min(currentIndex + 1, totalQuestions - 1),
    );
  }, [totalQuestions]);

  const goToPreviousQuestion = useCallback(() => {
    setCurrentQuestionIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  }, []);

  const finishQuiz = useCallback(() => {
    if (!quiz) {
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      const reviews = quiz.questions.map((question, index) => {
        const selectedOptionIndex = selectedAnswers[index];
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
      const total = quiz.questions.length;
      const wrongCount = total - correctCount;
      const percentage = Math.round((correctCount / total) * 100);

      setResults({
        score: correctCount,
        totalQuestions: total,
        percentage,
        correctCount,
        wrongCount,
        reviews,
      });
      setIsSubmitting(false);
    }, 350);
  }, [quiz, selectedAnswers]);

  const resetQuiz = useCallback(() => {
    if (!quiz) {
      return;
    }

    setSelectedAnswers(buildInitialAnswers(quiz.questions.length));
    setCurrentQuestionIndex(0);
    setResults(null);
    setQuizStartedAt(Date.now());
  }, [quiz]);

  const generateNewQuiz = useCallback(() => {
    setQuiz(null);
    setSelectedAnswers([]);
    setCurrentQuestionIndex(0);
    setResults(null);
    setQuizStartedAt(null);
  }, []);

  const updateFormState = useCallback(
    <K extends keyof QuizFormState>(key: K, value: QuizFormState[K]) => {
      setFormState((current) => ({ ...current, [key]: value }));
    },
    [],
  );

  return {
    formState,
    updateFormState,
    quiz,
    currentQuestion,
    currentQuestionIndex,
    selectedAnswers,
    selectAnswer,
    goToNextQuestion,
    goToPreviousQuestion,
    finishQuiz,
    resetQuiz,
    generateQuiz,
    generateNewQuiz,
    isGenerating,
    isSubmitting,
    errorMessage,
    setErrorMessage,
    results,
    isQuizActive,
    timeRemaining,
    totalQuestions,
  };
}
