import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch",
};

export default function ContactPage() {
  return (
    <div className="px-6 py-16 max-w-2xl mx-auto">
      <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
        Let's talk
      </h1>
      <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-12">
        Got a project idea? Want to collab? Just want to say hi? Drop me a
        message.
      </p>

      <form
        action="https://formspree.io/f/xkgbvkqv"
        method="POST"
        className="space-y-6"
      >
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            className="w-full px-4 py-3 bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all resize-none"
            placeholder="What's on your mind?"
          />
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-accent-primary hover:bg-accent-primary/90 text-white rounded-lg font-medium transition-colors"
        >
          Send message
        </button>
      </form>

      <div className="mt-12 pt-8 border-t border-light-border dark:border-dark-border">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Messages are sent securely via Formspree. You'll receive an email
          notification for each submission.
        </p>
      </div>
    </div>
  );
}
