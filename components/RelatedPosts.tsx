import Link from "next/link";
import { getBlogPosts, BlogPost } from "@/lib/blog";

interface RelatedPostsProps {
  currentSlug: string;
  currentTags: string[];
}

export default function RelatedPosts({
  currentSlug,
  currentTags,
}: RelatedPostsProps) {
  const allPosts = getBlogPosts();

  // Find related posts based on matching tags
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentSlug)
    .map((post) => {
      const matchingTags = post.metadata.tags.filter((tag) =>
        currentTags.includes(tag)
      );
      return {
        ...post,
        relevanceScore: matchingTags.length,
      };
    })
    .filter((post) => post.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, 3);

  // If no related posts by tags, show recent posts
  const postsToShow =
    relatedPosts.length > 0
      ? relatedPosts
      : allPosts.filter((post) => post.slug !== currentSlug).slice(0, 3);

  if (postsToShow.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t border-light-border dark:border-dark-border">
      <h3 className="font-display text-2xl font-bold mb-6">
        {relatedPosts.length > 0 ? "Related Posts" : "More Posts"}
      </h3>
      <div className="grid gap-4">
        {postsToShow.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-4 bg-light-card dark:bg-dark-card rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h4 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-accent-primary transition-colors">
                  {post.metadata.title}
                </h4>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2">
                  {post.metadata.description}
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-zinc-400">
                  <span>{post.metadata.readTime}</span>
                  <span>•</span>
                  <div className="flex gap-1">
                    {post.metadata.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-light-bg dark:bg-dark-bg rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-zinc-400 group-hover:text-accent-primary group-hover:translate-x-1 transition-all flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
