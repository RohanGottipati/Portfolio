export const SITE_URL = "https://rohangottipati.com";
export const DEFAULT_SOCIAL_IMAGE =
  "/15958fba-0eb9-4d42-9c49-c72e86d80c5b.jpg";

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
      "Explore 14 software projects I've built across portfolio design, AI agents, civic technology, 3D, analytics, healthcare, games, and full-stack development.",
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
    dateCreated: project.year,
    url: `${SITE_URL}/work/${project.slug}`,
    image: project.image ? `${SITE_URL}${project.image}` : undefined,
    author: {
      "@type": "Person",
      name: "Rohan Gottipati",
      url: SITE_URL,
    },
    keywords: project.tags.join(", "),
  };
}
