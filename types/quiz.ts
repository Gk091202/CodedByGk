export const QUIZ_LANGUAGES = [
  "C",
  "C++",
  "Java",
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "SQL",
  "MongoDB",
  "Git",
  "Data Structures",
  "Algorithms",
  "Operating Systems",
  "DBMS",
  "Computer Networks",
  "Aptitude",
] as const;

export const QUIZ_DIFFICULTIES = [
  "Beginner",
  "Intermediate",
  "Advanced",
] as const;

export const QUIZ_QUESTION_COUNTS = [10, 15, 20] as const;

export type QuizLanguage = (typeof QUIZ_LANGUAGES)[number];
export type QuizDifficulty = (typeof QUIZ_DIFFICULTIES)[number];
export type QuizQuestionCount = (typeof QUIZ_QUESTION_COUNTS)[number];

export interface QuizGenerationRequest {
  language: QuizLanguage;
  difficulty: QuizDifficulty;
  numberOfQuestions: QuizQuestionCount;
  timerEnabled: boolean;
  shuffleQuestions: boolean;
}

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  answer: number;
  explanation: string;
}

export interface GeneratedQuiz {
  questions: QuizQuestion[];
}

export interface QuizReviewItem {
  question: string;
  userAnswer: string | null;
  correctAnswer: string;
  explanation: string;
  isCorrect: boolean;
}

export interface QuizResults {
  score: number;
  totalQuestions: number;
  percentage: number;
  correctCount: number;
  wrongCount: number;
  reviews: QuizReviewItem[];
}

export interface QuizFormState {
  language: QuizLanguage;
  difficulty: QuizDifficulty;
  numberOfQuestions: QuizQuestionCount;
  timerEnabled: boolean;
  shuffleQuestions: boolean;
}
