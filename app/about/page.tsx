import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about the mind behind the blog",
};

export default function AboutPage() {
  return (
    <div className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="font-display text-5xl md:text-6xl font-bold mb-8">
        Hey, I'm Gaurav
      </h1>

      <div className="space-y-6 text-lg text-zinc-700 dark:text-zinc-300">
        <p>
          Welcome to my corner of the internet. This is where I share thoughts
          on tech, career, and everything that's shaping the future of software
          development.
        </p>

        <p>
          I'm a developer passionate about building real solutions and sharing
          insights about what it actually takes to succeed in tech. No fluff,
          just honest takes on development, career growth, and the challenges we
          all face in this industry.
        </p>

        <p>
          When I'm not coding or writing, you'll find me exploring new
          technologies, working on projects that solve real problems, and
          sharing what I learn along the way.
        </p>

        <div className="pt-8">
          <h2 className="font-display text-2xl font-bold mb-4">
            What I'm about
          </h2>
          <ul className="space-y-2 list-disc list-inside">
            <li>Building products that solve real problems</li>
            <li>Writing honest takes about tech and career</li>
            <li>Sharing knowledge and learning in public</li>
            <li>Clean code and practical solutions</li>
            <li>Helping developers navigate their careers</li>
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
            Always down to chat about projects, ideas, or career advice. Hit me
            up on{" "}
            <a
              href="https://x.com/Ko4Gaurav"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:text-accent-primary/80 transition-colors"
            >
              X
            </a>
            ,{" "}
            <a
              href="https://www.linkedin.com/in/gaurav-koli-34400522a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-primary hover:text-accent-primary/80 transition-colors"
            >
              LinkedIn
            </a>
            , or drop a message on the{" "}
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
