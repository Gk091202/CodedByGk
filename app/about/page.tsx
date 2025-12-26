import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about the mind behind the blog",
};

export default function AboutPage() {
  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-5xl md:text-6xl font-bold mb-8">
        Hey, I'm Alex
      </h1>

      <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
        <p>
          Welcome to my corner of the internet. This is where I share thoughts
          on tech, culture, and whatever's currently living rent-free in my
          head.
        </p>

        <p>
          I'm a software engineer by day, chronic overthinker by night. Been
          building things on the web since I convinced my parents that "making
          websites" was a real career path. Spoiler: they were skeptical, but
          here we are.
        </p>

        <p>
          When I'm not coding or writing, you'll find me experimenting with new
          frameworks, doom-scrolling design inspiration, or having strong
          opinions about typography that nobody asked for.
        </p>

        <div className="pt-8">
          <h2 className="font-display text-2xl font-bold mb-4">
            What I'm about
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Building products that don't suck</li>
            <li>Writing that's actually readable</li>
            <li>Dark mode everything</li>
            <li>Clean code and cleaner design</li>
            <li>Learning in public</li>
          </ul>
        </div>

        <div className="pt-8">
          <h2 className="font-display text-2xl font-bold mb-4">
            Stack I vibe with
          </h2>
          <div className="flex flex-wrap gap-2">
            {[
              "TypeScript",
              "React",
              "Next.js",
              "Tailwind",
              "Node.js",
              "PostgreSQL",
              "Vercel",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-light-card dark:bg-dark-card rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-8">
          <h2 className="font-display text-2xl font-bold mb-4">
            Let's connect
          </h2>
          <p>
            Always down to chat about projects, ideas, or why your favorite
            framework is objectively wrong (kidding... mostly). Hit me up on{" "}
            <a
              href="#"
              className="text-accent-primary hover:text-accent-primary/80 transition-colors"
            >
              Twitter
            </a>{" "}
            or drop a message on the{" "}
            <a
              href="/contact"
              className="text-accent-primary hover:text-accent-primary/80 transition-colors"
            >
              contact page
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
