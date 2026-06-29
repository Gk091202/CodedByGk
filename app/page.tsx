import Link from "next/link";
import dynamic from "next/dynamic";
import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import { topicHubs } from "@/lib/topics";
import type { Metadata } from "next";

const QuizGeneratorSection = dynamic(
  () => import("@/components/quiz/QuizGeneratorSection"),
  {
    ssr: false,
    loading: () => (
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
          <div className="h-6 w-40 animate-pulse rounded-full bg-zinc-300/60 dark:bg-zinc-700/60" />
          <div className="mt-4 h-4 w-80 animate-pulse rounded-full bg-zinc-300/60 dark:bg-zinc-700/60" />
          <div className="mt-8 h-56 animate-pulse rounded-3xl bg-zinc-300/60 dark:bg-zinc-700/60" />
        </div>
      </section>
    ),
  },
);

export const metadata: Metadata = {
  title:
    "Web Development Blog | Coding Career Advice and Frontend Best Practices",
  description:
    "A web development blog with coding career advice, interview prep, and frontend best practices for developers who want useful answers, not hype.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const posts = getBlogPosts().slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="px-6 py-32 max-w-5xl mx-auto">
        <div className="space-y-6 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-primary">
            Web development blog
          </p>
          <h1 className="font-display text-6xl md:text-7xl font-bold tracking-tight text-balance">
            Web development blog with coding career advice and frontend best
            practices
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 text-balance">
            Practical guides on building web apps, improving your coding skills,
            and growing your developer career with search-focused content.
          </p>
          <div className="flex gap-4 pt-4">
            <Link
              href="/blog"
              className="px-6 py-3 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg font-medium transition-colors"
            >
              Read the blog
            </Link>
            <Link
              href="/about"
              className="px-6 py-3 bg-light-card dark:bg-dark-card hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg font-medium transition-colors"
            >
              About me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="font-display text-3xl font-bold">
            Latest web development posts
          </h2>
          <Link
            href="/blog"
            className="text-accent-primary hover:text-accent-primary/80 font-medium transition-colors"
          >
            View all →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Topic Hubs */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Topic hubs</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Browse focused clusters for web development, coding career advice,
              and frontend best practices.
            </p>
          </div>
          <Link
            href="/topics"
            className="text-accent-primary hover:text-accent-primary/80 font-medium transition-colors"
          >
            View all hubs →
          </Link>
        </div>
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
              <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-accent-primary transition-colors">
                {topic.description}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                {topic.intro}
              </p>
              <span className="inline-flex items-center gap-2 text-sm font-medium text-accent-primary">
                Explore hub <span>→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Quiz Generator */}
      <QuizGeneratorSection />

      {/* CTA Section */}
      <section className="px-6 py-32 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Newsletter Signup */}
          <NewsletterSignup />

          {/* CTA Card */}
          <div className="bg-gradient-to-br from-accent-primary to-accent-secondary p-8 rounded-lg text-white flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-3">Stay in the loop</h3>
            <p className="text-white/90 mb-4">
              New posts every week on web development, coding career advice,
              coding practice, and frontend best practices.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-white text-accent-primary hover:bg-white/90 rounded-lg font-medium transition-colors w-fit"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
