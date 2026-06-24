import { getBlogPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read practical articles on web development, coding practice, career growth, and modern frontend engineering.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <BlogList posts={posts} />
    </div>
  );
}
