export const SITE_URL = "https://rohangottipati.com";
export const DEFAULT_SOCIAL_IMAGE =
  "/c7482166-3a87-4a04-8b46-94156b0b0e28.jpg";

export const PAGE_SEO = {
  home: {
    title: "Rohan Gottipati - Software Engineer",
    description:
      "I'm Rohan Gottipati, a software engineer building AI systems, full-stack products, data platforms, and cloud integrations. Explore my selected work and experience.",
    path: "/",
  },
  work: {
    title: "Projects | Rohan Gottipati",
    description:
      "Explore 15 software projects I've built across portfolio design, AI agents, FinTech, civic technology, 3D, analytics, healthcare, games, and full-stack development.",
    path: "/work",
  },
  about: {
    title: "About | Rohan Gottipati",
    description:
      "I'm a Toronto-based software engineer who builds useful products, AI systems, data platforms, and integrations. Learn more about me and what drives my work.",
    path: "/about",
  },
  experience: {
    title: "Experience | Rohan Gottipati",
    description:
      "Explore my software engineering experience, education, research, and leadership across Intact, DOUBL, OneChart, AvertoAI, and Wilfrid Laurier University.",
    path: "/experience",
  },
  contact: {
    title: "Contact | Rohan Gottipati",
    description:
      "Contact me by email, phone, LinkedIn, or GitHub, and view my current software engineering résumé.",
    path: "/contact",
  },
};

export function createProjectSeo(project) {
  return {
    title: `${project.name} | Rohan Gottipati`,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: project.image,
    imageAlt: `Preview of my ${project.name} project`,
    type: /** @type {"article"} */ ("article"),
  };
}

export function createProjectStructuredData(project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    dateCreated: project.date ?? project.year,
    url: `${SITE_URL}/work/${project.slug}`,
    image: project.image ? `${SITE_URL}${project.image}` : undefined,
    award: project.impact,
    isPartOf: project.event
      ? {
          "@type": "Event",
          name: project.event,
        }
      : undefined,
    author: {
      "@type": "Person",
      name: "Rohan Gottipati",
      url: SITE_URL,
    },
    keywords: project.tags.join(", "),
  };
}
