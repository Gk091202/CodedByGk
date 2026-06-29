export interface TopicHub {
  slug: string;
  title: string;
  description: string;
  intro: string;
  focusTags: string[];
}

export const topicHubs: TopicHub[] = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Practical frontend and full-stack guidance for developers who want to ship better web apps.",
    intro:
      "Actionable posts on frameworks, tools, performance, and modern web development workflows.",
    focusTags: ["web dev", "tools", "workflow", "frameworks"],
  },
  {
    slug: "career-growth",
    title: "Career Growth",
    description:
      "Advice on landing jobs, building a portfolio, and improving your developer career path.",
    intro:
      "Content focused on job search strategy, projects, interview prep, and student-friendly opportunities.",
    focusTags: ["career", "projects", "job search", "portfolio", "internships"],
  },
  {
    slug: "coding-practice",
    title: "Coding Practice",
    description:
      "Interview prep, problem-solving practice, and platforms that help you level up faster.",
    intro:
      "A hub for coding challenge platforms, interview preparation, and consistent practice routines.",
    focusTags: ["coding practice", "interview prep", "websites"],
  },
  {
    slug: "indie-building",
    title: "Indie Building",
    description:
      "Building in public, side projects, and the reality of shipping solo products.",
    intro:
      "Posts about solo shipping, product momentum, and avoiding the side-project graveyard.",
    focusTags: [
      "indie dev",
      "building in public",
      "startup",
      "productivity",
      "side projects",
    ],
  },
];

export function getTopicHubBySlug(slug: string): TopicHub | null {
  return topicHubs.find((topic) => topic.slug === slug) ?? null;
}

export function getTopicHubForTags(tags: string[]): TopicHub | null {
  return (
    topicHubs.find((topic) =>
      topic.focusTags.some((focusTag) => tags.includes(focusTag)),
    ) ?? null
  );
}
