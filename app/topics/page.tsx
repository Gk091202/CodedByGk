import Link from "next/link";
import type { Metadata } from "next";
import { topicHubs } from "@/lib/topics";

export const metadata: Metadata = {
  title: "Topic Hubs",
  description:
    "Browse focused topic hubs covering web development, coding practice, career growth, and indie building.",
  alternates: {
    canonical: "/topics",
  },
};

export default function TopicsPage() {
  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <header className="max-w-3xl mb-12 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-primary">
          Topic hubs
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-balance">
          Focused content hubs for search and readers
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 text-balance">
          These hubs group related posts together so visitors can explore one
          theme deeply and search engines can understand the site structure
          better.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {topicHubs.map((topic) => (
          <Link
            key={topic.slug}
            href={`/topics/${topic.slug}`}
            className="group rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-6 transition-all hover:border-accent-primary"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-primary mb-3">
              {topic.title}
            </p>
            <h2 className="font-display text-2xl font-bold mb-3 group-hover:text-accent-primary transition-colors">
              {topic.description}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              {topic.intro}
            </p>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary">
              Explore hub <span>→</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
