"use client";

import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { commentsService } from "@/lib/appwrite";

interface Comment {
  $id: string;
  content: string;
  userName: string;
  userId: string;
  createdAt: string;
}

export default function Comments({ postSlug }: { postSlug: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadComments();
  }, [postSlug]);

  const loadComments = async () => {
    const result = await commentsService.getByPost(postSlug);
    if (result.success && result.data) {
      setComments(result.data as unknown as Comment[]);
      setError("");
    } else {
      setError(result.error || "Failed to load comments");
      console.error("Comments error:", result.error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setSubmitting(true);
    setError("");
    const result = await commentsService.create(
      postSlug,
      newComment,
      user.$id,
      user.name
    );

    if (result.success) {
      setNewComment("");
      loadComments();
    } else {
      setError(result.error || "Failed to post comment");
      console.error("Post comment error:", result.error);
    }
    setSubmitting(false);
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("Delete this comment?")) return;

    const result = await commentsService.delete(commentId);
    if (result.success) {
      loadComments();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
      <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>

      {/* Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="mb-8">
          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">
                <strong>Error:</strong> {error}
              </p>
              <p className="text-red-500 dark:text-red-500 text-xs mt-2">
                Make sure you have created the Comments collection in Appwrite
                Console and updated the collection ID in .env.local
              </p>
            </div>
          )}
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-accent-primary resize-none"
            disabled={submitting}
          />
          <button
            type="submit"
            disabled={submitting || !newComment.trim()}
            className="mt-3 px-6 py-2 bg-accent-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50"
          >
            {submitting ? "Posting..." : "Post Comment"}
          </button>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-400">
            Please login to leave a comment
          </p>
        </div>
      )}

      {/* Comments List */}
      {loading ? (
        <p className="text-gray-500">Loading comments...</p>
      ) : comments.length === 0 ? (
        <p className="text-gray-500">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.$id}
              className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium">{comment.userName}</p>
                  <p className="text-sm text-gray-500">
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
                {user &&
                  (user.$id === comment.userId ||
                    user.labels?.includes("admin")) && (
                    <button
                      onClick={() => handleDelete(comment.$id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Delete
                    </button>
                  )}
              </div>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
