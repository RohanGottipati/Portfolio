export const SITE_URL = "https://rohangottipati.com";
export const DEFAULT_SOCIAL_IMAGE =
  "/b8e2024f-be86-4bcd-95d3-e3775abd17d4.jpg";

export const PAGE_SEO = {
  home: {
    title: "Rohan Gottipati | Software Engineer",
    description:
      "Rohan Gottipati is a Toronto-based software engineer and Software Architect Intern at Intact. Explore his work, projects, and nine hackathon wins.",
    path: "/",
    image: "/b8e2024f-be86-4bcd-95d3-e3775abd17d4.jpg",
    imageAlt: "The Toronto skyline and CN Tower seen across the water from Toronto Island",
  },
  work: {
    title: "Work | Rohan Gottipati",
    description: "Explore Rohan Gottipati's software engineering, research, and leadership experience.",
    path: "/work",
    imageAlt: "The Toronto skyline and CN Tower seen across the water from Toronto Island",
  },
  projects: {
    title: "Projects | Rohan Gottipati",
    description: "Projects and hackathon work by Rohan Gottipati.",
    path: "/projects",
    imageAlt: "The Toronto skyline and CN Tower seen across the water from Toronto Island",
  },
  about: { title: "About | Rohan Gottipati", description: "About Rohan Gottipati.", path: "/about" },
  experience: { title: "Experience | Rohan Gottipati", description: "Experience of Rohan Gottipati.", path: "/experience" },
  contact: { title: "Contact | Rohan Gottipati", description: "Contact Rohan Gottipati.", path: "/contact" },
  brief: { title: "Quick View | Rohan Gottipati", description: "A quick view of Rohan Gottipati's work.", path: "/brief" },
  recognition: { title: "Recognition | Rohan Gottipati", description: "Recognition of Rohan Gottipati's projects.", path: "/recognition" },
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
