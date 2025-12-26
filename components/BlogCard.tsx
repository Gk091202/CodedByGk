import Link from "next/link";

interface BlogPost {
  slug: string;
  metadata: {
    title: string;
    description: string;
    date: string;
    author: string;
    tags: string[];
    readTime: string;
  };
}

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <article className="group h-full p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl hover:border-accent-primary dark:hover:border-accent-primary transition-all">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.metadata.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-light-bg dark:bg-dark-bg rounded text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent-primary transition-colors">
          {post.metadata.title}
        </h3>

        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2">
          {post.metadata.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-500">
          <time dateTime={post.metadata.date}>
            {new Date(post.metadata.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{post.metadata.readTime}</span>
        </div>
      </article>
    </Link>
  );
}
