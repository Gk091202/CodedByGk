import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";
import BlogCard from "@/components/BlogCard";

export default function Home() {
  const posts = getBlogPosts().slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="px-6 py-32 max-w-5xl mx-auto">
        <div className="space-y-6">
          <h1 className="font-display text-6xl md:text-7xl font-bold tracking-tight text-balance">
            No cap, just{" "}
            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
              real talk
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-2xl text-balance">
            Thoughts on tech, culture, and everything that hits different.
            Updated when the vibes are immaculate.
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
          <h2 className="font-display text-3xl font-bold">Latest drops</h2>
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

      {/* CTA Section */}
      <section className="px-6 py-32 max-w-5xl mx-auto">
        <div className="bg-gradient-to-br from-accent-primary to-accent-secondary p-12 rounded-2xl text-white">
          <h2 className="font-display text-4xl font-bold mb-4">
            Stay in the loop
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-xl">
            New posts every week. No spam, no cringe, just quality content
            straight to your feed.
          </p>
          <Link
            href="/contact"
            className="inline-block px-6 py-3 bg-white text-accent-primary hover:bg-white/90 rounded-lg font-medium transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>

      {/* Resources Section */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="font-display text-3xl font-bold">Free Resources</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mt-2">
              Helpful guides and cheat sheets to level up your skills
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Resource Card 1 */}
          <a
            href="/pdfs/resource-1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-full p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl hover:border-accent-primary dark:hover:border-accent-primary transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-light-bg dark:bg-dark-bg rounded text-xs font-medium">
                PDF
              </span>
              <span className="px-2 py-1 bg-accent-primary/10 text-accent-primary rounded text-xs font-medium">
                Guide
              </span>
            </div>
            <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent-primary transition-colors">
              JavaScript Essentials
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              Complete guide to modern JavaScript concepts and best practices
            </p>
            <div className="flex items-center gap-2 text-sm text-accent-primary">
              <span>Download PDF</span>
              <span>→</span>
            </div>
          </a>

          {/* Resource Card 2 */}
          <a
            href="/pdfs/resource-2.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-full p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl hover:border-accent-primary dark:hover:border-accent-primary transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-light-bg dark:bg-dark-bg rounded text-xs font-medium">
                PDF
              </span>
              <span className="px-2 py-1 bg-accent-secondary/10 text-accent-secondary rounded text-xs font-medium">
                Cheat Sheet
              </span>
            </div>
            <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent-primary transition-colors">
              React Hooks Reference
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              Quick reference guide for all React hooks with examples
            </p>
            <div className="flex items-center gap-2 text-sm text-accent-primary">
              <span>Download PDF</span>
              <span>→</span>
            </div>
          </a>

          {/* Resource Card 3 */}
          <a
            href="/pdfs/resource-3.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-full p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl hover:border-accent-primary dark:hover:border-accent-primary transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-light-bg dark:bg-dark-bg rounded text-xs font-medium">
                PDF
              </span>
              <span className="px-2 py-1 bg-accent-primary/10 text-accent-primary rounded text-xs font-medium">
                Tutorial
              </span>
            </div>
            <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent-primary transition-colors">
              Git & GitHub Workflow
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              Master version control with this comprehensive workflow guide
            </p>
            <div className="flex items-center gap-2 text-sm text-accent-primary">
              <span>Download PDF</span>
              <span>→</span>
            </div>
          </a>

          {/* Resource Card 4 */}
          <a
            href="/pdfs/resource-4.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-full p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl hover:border-accent-primary dark:hover:border-accent-primary transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-light-bg dark:bg-dark-bg rounded text-xs font-medium">
                PDF
              </span>
              <span className="px-2 py-1 bg-accent-secondary/10 text-accent-secondary rounded text-xs font-medium">
                Cheat Sheet
              </span>
            </div>
            <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent-primary transition-colors">
              CSS Flexbox & Grid
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              Visual guide to modern CSS layout techniques with examples
            </p>
            <div className="flex items-center gap-2 text-sm text-accent-primary">
              <span>Download PDF</span>
              <span>→</span>
            </div>
          </a>

          {/* Resource Card 5 */}
          <a
            href="/pdfs/resource-5.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-full p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl hover:border-accent-primary dark:hover:border-accent-primary transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-light-bg dark:bg-dark-bg rounded text-xs font-medium">
                PDF
              </span>
              <span className="px-2 py-1 bg-accent-primary/10 text-accent-primary rounded text-xs font-medium">
                Guide
              </span>
            </div>
            <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent-primary transition-colors">
              TypeScript Fundamentals
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              Everything you need to start using TypeScript in your projects
            </p>
            <div className="flex items-center gap-2 text-sm text-accent-primary">
              <span>Download PDF</span>
              <span>→</span>
            </div>
          </a>

          {/* Resource Card 6 */}
          <a
            href="/pdfs/resource-6.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group h-full p-6 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl hover:border-accent-primary dark:hover:border-accent-primary transition-all"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-1 bg-light-bg dark:bg-dark-bg rounded text-xs font-medium">
                PDF
              </span>
              <span className="px-2 py-1 bg-accent-secondary/10 text-accent-secondary rounded text-xs font-medium">
                Tutorial
              </span>
            </div>
            <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent-primary transition-colors">
              Next.js Best Practices
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
              Build better Next.js apps with proven patterns and techniques
            </p>
            <div className="flex items-center gap-2 text-sm text-accent-primary">
              <span>Download PDF</span>
              <span>→</span>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
