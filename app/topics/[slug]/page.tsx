import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPosts } from "@/lib/blog";
import { getTopicHubBySlug } from "@/lib/topics";
import BlogCard from "@/components/BlogCard";

export async function generateStaticParams() {
  return [
    "web-development",
    "career-growth",
    "coding-practice",
    "indie-building",
  ].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const topic = getTopicHubBySlug(params.slug);

  if (!topic) {
    return {};
  }

  return {
    title: topic.title,
    description: topic.description,
    alternates: {
      canonical: `/topics/${topic.slug}`,
    },
  };
}

function buildBreadcrumbJsonLd(topicTitle: string, topicSlug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.codedbygk.tech",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Topics",
        item: "https://www.codedbygk.tech/topics",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: topicTitle,
        item: `https://www.codedbygk.tech/topics/${topicSlug}`,
      },
    ],
  };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopicHubBySlug(params.slug);

  if (!topic) {
    notFound();
  }

  const allPosts = getBlogPosts();
  const topicPosts = allPosts.filter((post) =>
    post.metadata.tags.some((tag) => topic.focusTags.includes(tag)),
  );
  const jsonLd = buildBreadcrumbJsonLd(topic.title, topic.slug);

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-3xl mb-12 space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-primary">
          Topic hub
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-balance">
          {topic.title}
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 text-balance">
          {topic.description}
        </p>
        <p className="text-zinc-600 dark:text-zinc-400">{topic.intro}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="/blog"
            className="inline-flex items-center rounded-lg bg-accent-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-primary/90"
          >
            Back to blog
          </Link>
          <Link
            href="/topics"
            className="inline-flex items-center rounded-lg bg-light-card px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-200 dark:bg-dark-card dark:hover:bg-zinc-800"
          >
            All topic hubs
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {topicPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {topicPosts.length === 0 && (
        <div className="rounded-2xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-8 mt-8">
          <h2 className="font-display text-2xl font-bold mb-2">
            No posts yet in this hub
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Add more posts that match this theme and the hub will start to build
            topical authority.
          </p>
        </div>
      )}
    </div>
  );
}
