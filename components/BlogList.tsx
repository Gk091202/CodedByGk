"use client";

import { useState } from "react";
import BlogCard from "./BlogCard";

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

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.metadata.tags))
  );

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.metadata.tags.includes(selectedTag))
    : posts;

  return (
    <>
      <div className="mb-12">
        <h1 className="font-display text-5xl font-bold mb-4">All posts</h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      {/* Tag Filter */}
      <div className="flex flex-wrap gap-2 mb-12">
        <button
          onClick={() => setSelectedTag(null)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            selectedTag === null
              ? "bg-accent-primary text-white"
              : "bg-light-card dark:bg-dark-card hover:bg-zinc-200 dark:hover:bg-zinc-800"
          }`}
        >
          All
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedTag === tag
                ? "bg-accent-primary text-white"
                : "bg-light-card dark:bg-dark-card hover:bg-zinc-200 dark:hover:bg-zinc-800"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-zinc-500 dark:text-zinc-400">
            No posts found with this tag
          </p>
        </div>
      )}
    </>
  );
}
