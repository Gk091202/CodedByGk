"use client";

import { useState } from "react";
import { newsletterService } from "@/lib/appwrite";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // Check if already subscribed
    const isSubscribed = await newsletterService.checkIfSubscribed(email);
    if (isSubscribed) {
      setStatus("error");
      setMessage("This email is already subscribed!");
      return;
    }

    // Subscribe
    const result = await newsletterService.subscribe(email, name);

    if (result.success) {
      setStatus("success");
      setMessage("Thanks for subscribing! Check your email.");
      setEmail("");
      setName("");
    } else {
      setStatus("error");
      setMessage(result.error || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold mb-2">Subscribe to Newsletter</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Get notified when I drop new posts. No spam, ever.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-accent-primary focus:border-transparent"
            disabled={status === "loading"}
          />
        </div>

        <div>
          <input
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-accent-primary focus:border-transparent"
            disabled={status === "loading"}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full px-4 py-2 bg-accent-primary text-white rounded-lg font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-sm ${
            status === "success"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
