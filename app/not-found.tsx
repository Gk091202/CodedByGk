export default function NotFound() {
  return (
    <div className="px-6 py-32 max-w-5xl mx-auto text-center">
      <h1 className="font-display text-6xl font-bold mb-4">404</h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
        This page said bye bye
      </p>
      <a
        href="/"
        className="inline-block px-6 py-3 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg font-medium transition-colors"
      >
        Go home
      </a>
    </div>
  );
}
