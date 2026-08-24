import { useEffect } from "react";

import {
  DEFAULT_SOCIAL_IMAGE,
  SITE_URL,
} from "../data/seo.mjs";

const INDEX_DIRECTIVE =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  structuredData?: Record<string, unknown>;
}

function absoluteUrl(value: string): string {
  return value.startsWith("http")
    ? value
    : `${SITE_URL}${value.startsWith("/") ? value : `/${value}`}`;
}

const META_ATTRIBUTES: Record<string, ["name" | "property", string]> = {
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

function setContent(id: string, value: string) {
  let element = document.getElementById(id) as HTMLMetaElement | null;

  if (!element) {
    const [attribute, attributeValue] = META_ATTRIBUTES[id];
    element = document.createElement("meta");
    element.id = id;
    element.setAttribute(attribute, attributeValue);
    document.head.appendChild(element);
  }

  element.setAttribute("content", value);
}

export function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_SOCIAL_IMAGE,
  imageAlt = "A preview from my software engineering portfolio",
  type = "website",
  noIndex = false,
  structuredData,
}: SeoProps) {
  useEffect(() => {
    const url = absoluteUrl(path);
    const socialImage = absoluteUrl(image);

    document.title = title;
    setContent("meta-description", description);
    setContent("meta-robots", noIndex ? "noindex, nofollow" : INDEX_DIRECTIVE);
    let canonical = document.getElementById(
      "canonical-link",
    ) as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.id = "canonical-link";
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    setContent("og-title", title);
    setContent("og-description", description);
    setContent("og-type", type);
    setContent("og-url", url);
    setContent("og-image", socialImage);
    setContent("og-image-alt", imageAlt);
    setContent("twitter-title", title);
    setContent("twitter-description", description);
    setContent("twitter-image", socialImage);

    const existing = document.getElementById("page-structured-data");
    existing?.remove();

    if (structuredData) {
      const script = document.createElement("script");
      script.id = "page-structured-data";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    return () => {
      document.getElementById("page-structured-data")?.remove();
    };
  }, [
    description,
    image,
    imageAlt,
    noIndex,
    path,
    structuredData,
    title,
    type,
  ]);

  return null;
}
