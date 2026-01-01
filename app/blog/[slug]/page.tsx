import { notFound } from "next/navigation";
import { getBlogPosts, getPostBySlug } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import ShareButtons from "@/components/ShareButtons";
import Comments from "@/components/Comments";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: "article",
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="px-6 py-16 max-w-3xl mx-auto">
      {/* Header */}
      <header className="mb-12">
        <div className="flex flex-wrap gap-2 mb-4">
          {post.metadata.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-light-card dark:bg-dark-card rounded-lg text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-balance">
          {post.metadata.title}
        </h1>
        <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
          <span>{post.metadata.author}</span>
          <span>•</span>
          <time dateTime={post.metadata.date}>
            {new Date(post.metadata.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{post.metadata.readTime}</span>
        </div>
      </header>

      {/* Content */}
      <div
        className="prose prose-zinc dark:prose-invert prose-lg max-w-none
        prose-headings:font-display prose-headings:font-bold
        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
        prose-p:text-zinc-700 dark:prose-p:text-zinc-300
        prose-a:text-accent-primary prose-a:no-underline hover:prose-a:text-accent-primary/80
        prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
        prose-code:bg-light-card dark:prose-code:bg-dark-card 
        prose-code:px-2 prose-code:py-1 prose-code:rounded
        prose-code:text-accent-primary prose-code:font-normal
        prose-pre:bg-dark-card prose-pre:border prose-pre:border-dark-border
        prose-blockquote:border-l-accent-primary prose-blockquote:italic
        prose-img:rounded-xl"
      >
        <MDXRemote source={post.content} />
      </div>

      {/* Share Section */}
      <div className="mt-16 pt-8 border-t border-light-border dark:border-dark-border">
        <ShareButtons
          url={`https://www.codedbygk.tech/blog/${post.slug}`}
          title={post.metadata.title}
        />
      </div>

      {/* Comments Section */}
      <Comments postSlug={params.slug} />
    </article>
  );
}
