import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { projects } from "../src/data/projects.mjs";
import {
  createProjectSeo,
  createProjectStructuredData,
  DEFAULT_SOCIAL_IMAGE,
  PAGE_SEO,
  SITE_URL,
} from "../src/data/seo.mjs";

const INDEX_DIRECTIVE =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

const META_ATTRIBUTES = {
  "meta-description": ["name", "description"],
  "meta-robots": ["name", "robots"],
  "og-title": ["property", "og:title"],
  "og-description": ["property", "og:description"],
  "og-type": ["property", "og:type"],
  "og-url": ["property", "og:url"],
  "og-image": ["property", "og:image"],
  "og-image-alt": ["property", "og:image:alt"],
  "twitter-title": ["name", "twitter:title"],
  "twitter-description": ["name", "twitter:description"],
  "twitter-image": ["name", "twitter:image"],
};

function absoluteUrl(value) {
  return value.startsWith("http")
    ? value
    : `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function replaceMeta(html, id, value) {
  const [attribute, attributeValue] = META_ATTRIBUTES[id];
  const tag = `<meta id="${id}" ${attribute}="${attributeValue}" content="${escapeHtml(value)}" />`;
  return html.replace(new RegExp(`<meta\\s+id="${id}"[^>]*>`), tag);
}

function applySeo(html, seo, structuredData) {
  const url = absoluteUrl(seo.path);
  const image = absoluteUrl(seo.image || DEFAULT_SOCIAL_IMAGE);
  const imageAlt =
    seo.imageAlt || "A preview from my software engineering portfolio";

  let output = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(seo.title)}</title>`,
  );
  output = replaceMeta(output, "meta-description", seo.description);
  output = replaceMeta(output, "meta-robots", INDEX_DIRECTIVE);
  output = output.replace(
    /<link\s+id="canonical-link"[^>]*>/,
    `<link id="canonical-link" rel="canonical" href="${escapeHtml(url)}" />`,
  );
  output = replaceMeta(output, "og-title", seo.title);
  output = replaceMeta(output, "og-description", seo.description);
  output = replaceMeta(output, "og-type", seo.type || "website");
  output = replaceMeta(output, "og-url", url);
  output = replaceMeta(output, "og-image", image);
  output = replaceMeta(output, "og-image-alt", imageAlt);
  output = replaceMeta(output, "twitter-title", seo.title);
  output = replaceMeta(output, "twitter-description", seo.description);
  output = replaceMeta(output, "twitter-image", image);

  if (structuredData) {
    const json = JSON.stringify(structuredData).replaceAll("<", "\\u003c");
    output = output.replace(
      "</head>",
      `    <script id="page-structured-data" type="application/ld+json">${json}</script>\n  </head>`,
    );
  }

  return output;
}

async function writeRoute(outputDirectory, route, html) {
  if (route === "/") {
    await writeFile(path.join(outputDirectory, "index.html"), html);
    return;
  }

  const directory = path.join(outputDirectory, route.slice(1));
  await mkdir(directory, { recursive: true });
  await Promise.all([
    writeFile(path.join(directory, "index.html"), html),
    writeFile(`${directory}.html`, html),
  ]);
}

export async function generateRouteHtml(outputDirectory = "dist") {
  const resolvedOutput = path.resolve(outputDirectory);
  const template = await readFile(
    path.join(resolvedOutput, "index.html"),
    "utf8",
  );

  const pageRoutes = Object.values(PAGE_SEO).map((seo) => ({ seo }));
  const projectRoutes = projects.map((project) => ({
    seo: createProjectSeo(project),
    structuredData: createProjectStructuredData(project),
  }));

  await Promise.all(
    [...pageRoutes, ...projectRoutes].map(({ seo, structuredData }) =>
      writeRoute(
        resolvedOutput,
        seo.path,
        applySeo(template, seo, structuredData),
      ),
    ),
  );
}
