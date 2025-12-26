import { getBlogPosts } from "@/lib/blog";
import BlogList from "@/components/BlogList";

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="px-6 py-16 max-w-5xl mx-auto">
      <BlogList posts={posts} />
    </div>
  );
}
