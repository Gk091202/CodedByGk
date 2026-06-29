export default function QuizSkeleton() {
  return (
    <div className="animate-pulse space-y-6 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
      <div className="h-6 w-48 rounded-full bg-zinc-300/60 dark:bg-zinc-700/60" />
      <div className="h-4 w-80 rounded-full bg-zinc-300/60 dark:bg-zinc-700/60" />
      <div className="h-56 rounded-3xl bg-zinc-300/60 dark:bg-zinc-700/60" />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="h-14 rounded-2xl bg-zinc-300/60 dark:bg-zinc-700/60" />
        <div className="h-14 rounded-2xl bg-zinc-300/60 dark:bg-zinc-700/60" />
        <div className="h-14 rounded-2xl bg-zinc-300/60 dark:bg-zinc-700/60" />
        <div className="h-14 rounded-2xl bg-zinc-300/60 dark:bg-zinc-700/60" />
      </div>
    </div>
  );
}
